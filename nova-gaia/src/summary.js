import fs from 'fs';
import path from 'path';
import { summarizeUpdate } from './ai.js';

const summaryPath = process.env.SUMMARY_PATH || './logs/summary.txt';

function ensureSummaryFile() {
  const dir = path.dirname(summaryPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(summaryPath)) fs.writeFileSync(summaryPath, 'Summary of Operation ANTA:\n\n', 'utf8');
}

export function readSummary() {
  ensureSummaryFile();
  return fs.readFileSync(summaryPath, 'utf8');
}

export function writeSummary(text) {
  ensureSummaryFile();
  fs.writeFileSync(summaryPath, text, 'utf8');
}

export async function updateNarrativeSummary({ sessionId, points, actionText, summary, consequences }) {
  const prev = readSummary();
  const event = `Session ${sessionId} gained ${points} pts. Action: ${actionText}. Impact: ${summary}. Outcome: ${consequences}`;
  try {
    const next = await summarizeUpdate(prev, event);
    if (typeof next === 'string' && next.trim()) {
      writeSummary(next);
    }
  } catch (e) {
    const fallback = prev + `\n- ${event}`;
    writeSummary(fallback);
  }
}


