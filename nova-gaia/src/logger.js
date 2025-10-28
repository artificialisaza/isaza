import fs from 'fs';
import path from 'path';

const queue = [];
let writing = false;

function ensureLogFile() {
  const logPath = process.env.LOG_PATH || './logs/anta.log';
  const dir = path.dirname(logPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(logPath)) fs.writeFileSync(logPath, '', 'utf8');
  return logPath;
}

export function appendLog(entry) {
  const logPath = ensureLogFile();
  const line = formatLogLine(entry);
  queue.push({ logPath, line });
  if (!writing) processQueue();
}

function formatLogLine({ sessionId, points, actionText, summary, consequences }) {
  const ts = new Date().toISOString();
  const safe = (v) => String(v).replace(/\n/g, ' ').replace(/\r/g, ' ').trim();
  return `${ts} | ${safe(sessionId)} | ${points} | ${safe(actionText)} | ${safe(summary)} | ${safe(consequences)}\n`;
}

function processQueue() {
  if (queue.length === 0) {
    writing = false;
    return;
  }
  writing = true;
  const { logPath, line } = queue.shift();
  fs.appendFile(logPath, line, (err) => {
    if (err) console.error('Log write failed', err);
    processQueue();
  });
}


