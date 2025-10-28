import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

let dbInstance;

export async function ensureDatabase() {
  const dbPath = process.env.DATABASE_PATH || './data/anta.sqlite';
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  dbInstance = new Database(dbPath);
  dbInstance.pragma('journal_mode = WAL');
  dbInstance.pragma('synchronous = NORMAL');

  dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      session_id TEXT PRIMARY KEY,
      cumulative_points INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const hasScore = dbInstance.prepare('SELECT 1 FROM meta WHERE key = ?').get('global_score');
  if (!hasScore) {
    dbInstance.prepare('INSERT INTO meta(key, value) VALUES(?, ?)').run('global_score', '0');
  }
}

export function getDb() {
  if (!dbInstance) throw new Error('Database not initialized');
  return dbInstance;
}


