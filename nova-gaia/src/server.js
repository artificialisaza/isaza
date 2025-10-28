import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { nanoid } from 'nanoid';
import { ensureDatabase, getDb } from './db.js';
import { appendLog } from './logger.js';
import { evaluateAction } from './ai.js';
import { updateNarrativeSummary, readSummary } from './summary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'"],
      "style-src": ["'self'", "'unsafe-inline'"],
      "img-src": ["'self'", "data:"],
      "font-src": ["'self'", "data:"],
      "connect-src": ["'self'"],
      "media-src": ["'self'", "data:"],
      "object-src": ["'none'"]
    }
  }
}));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.SESSION_SECRET || 'dev-secret'));

// Static frontend
app.use(express.static(path.join(__dirname, '../public')));

// Session middleware
app.use((req, res, next) => {
  let sessionId = req.signedCookies?.sessionId;
  if (!sessionId) {
    sessionId = nanoid(24);
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
  }
  req.sessionId = sessionId;
  next();
});

// Initialize DB
await ensureDatabase();

app.get('/api/score', (req, res) => {
  const db = getDb();
  const row = db.prepare('SELECT value FROM meta WHERE key = ?').get('global_score');
  const score = row ? Number(row.value) : 0;
  res.json({ currentScore: score, goal: 8000000000 });
});

app.post('/api/evaluateAction', async (req, res) => {
  try {
    const { actionText } = req.body || {};
    if (typeof actionText !== 'string' || actionText.trim().length === 0) {
      return res.status(400).json({ error: 'Invalid actionText' });
    }

    const sessionId = req.sessionId;
    const evalResult = await evaluateAction(actionText, { sessionId });
    const points = Math.max(0, Math.min(500, Math.floor(evalResult.points || 0)));
    const summary = evalResult.summary || 'Action evaluated.';
    const consequences = evalResult.consequences || 'No notable consequences.';

    const db = getDb();
    const tx = db.transaction(() => {
      // Update global score
      const row = db.prepare('SELECT value FROM meta WHERE key = ?').get('global_score');
      const currentScore = row ? Number(row.value) : 0;
      const newScore = currentScore + points;
      db.prepare('INSERT INTO meta(key, value) VALUES(?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value')
        .run('global_score', String(newScore));

      // Upsert session cumulative
      const s = db.prepare('SELECT cumulative_points FROM sessions WHERE session_id = ?').get(sessionId);
      const cumulative = (s ? Number(s.cumulative_points) : 0) + points;
      db.prepare('INSERT INTO sessions(session_id, cumulative_points, updated_at) VALUES(?, ?, CURRENT_TIMESTAMP) ON CONFLICT(session_id) DO UPDATE SET cumulative_points = ?, updated_at = CURRENT_TIMESTAMP')
        .run(sessionId, cumulative, cumulative);

      return newScore;
    });
    const newScore = tx();

    await appendLog({
      sessionId,
      points,
      actionText,
      summary,
      consequences
    });

    // Update narrative summary only for relevant actions (>= 10 points)
    if (points >= 10) {
      updateNarrativeSummary({ sessionId, points, actionText, summary, consequences }).catch(() => {});
    }

    res.json({ points, consequences, summary, newScore, goal: 8000000000, source: evalResult.source || 'ai' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Evaluation failed' });
  }
});

app.post('/api/logAccess', (req, res) => {
  const db = getDb();
  const sessionId = req.sessionId;
  const s = db.prepare('SELECT cumulative_points FROM sessions WHERE session_id = ?').get(sessionId);
  const cumulative = s ? Number(s.cumulative_points) : 0;
  if (cumulative < 500) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  // Stream the log content without saving to client disk; frontend will render text.
  const logPath = process.env.LOG_PATH || './logs/anta.log';
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  // Serve narrative summary instead of raw log
  try {
    const text = readSummary();
    return res.send(text);
  } catch {
    return res.sendFile(path.resolve(logPath));
  }
});

// Diagnostics: list available Google models for this API key
app.get('/api/diagnostics/models', async (req, res) => {
  try {
    const key = process.env.GOOGLE_API_KEY;
    if (!key) return res.status(500).json({ error: 'GOOGLE_API_KEY not set' });
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`;
    const r = await fetch(url);
    const j = await r.json();
    if (!r.ok) return res.status(r.status).json(j);
    const models = (j.models || []).map(m => ({ name: m.name, methods: m.supportedGenerationMethods }));
    res.json({ models });
  } catch (e) {
    res.status(500).json({ error: 'ListModels failed' });
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`ANTA server listening on http://localhost:${port}`);
});


