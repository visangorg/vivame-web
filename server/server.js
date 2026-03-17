/**
 * VIVAME 19기 지원서 수집 서버
 * - POST /api/apply : 지원서 저장
 * - GET /api/applications/csv?key=ADMIN_SECRET : 전체 CSV 다운로드 (운영자용)
 */
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'applications.json');

const app = express();
const PORT = process.env.PORT || 3001;
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'vivame-admin-secret-change-me';

app.use(cors({ origin: true }));
app.use(express.json());

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readApplications() {
  ensureDataDir();
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeApplications(list) {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf8');
}

function escapeCsvCell(value) {
  if (value == null) return '';
  const s = String(value);
  if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

// POST /api/apply — 지원서 저장
app.post('/api/apply', (req, res) => {
  const { name, cell, reason, expectations, recommend, agree } = req.body || {};
  if (!name || !cell || !reason || !expectations) {
    return res.status(400).json({ ok: false, message: '필수 항목이 비어 있습니다.' });
  }
  const list = readApplications();
  list.push({
    name: String(name).trim(),
    cell: String(cell).trim(),
    reason: String(reason ?? '').trim(),
    expectations: String(expectations ?? '').trim(),
    recommend: String(recommend ?? '').trim(),
    agree: agree === '동의' || agree === true ? '동의' : '',
    submittedAt: new Date().toISOString()
  });
  writeApplications(list);
  res.status(200).json({ ok: true });
});

// GET /api/applications/csv?key=ADMIN_SECRET — 전체 CSV 다운로드 (운영자용)
app.get('/api/applications/csv', (req, res) => {
  const key = req.query.key;
  if (key !== ADMIN_SECRET) {
    return res.status(401).send('Unauthorized');
  }
  const list = readApplications();
  const headers = ['성함', '소속 Cell', '지원 이유', '기대/경험', '추천 동료', '개인정보 동의', '제출일시'];
  const rows = list.map((row) => [
    row.name,
    row.cell,
    row.reason,
    row.expectations,
    row.recommend,
    row.agree,
    row.submittedAt || ''
  ]);
  const csvContent = [
    headers.map(escapeCsvCell).join(','),
    ...rows.map((r) => r.map(escapeCsvCell).join(','))
  ].join('\n');
  const bom = '\uFEFF';
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="vivame-19기-지원목록.csv"');
  res.send(bom + csvContent);
});

app.listen(PORT, () => {
  console.log(`VIVAME apply server running at http://localhost:${PORT}`);
  console.log(`CSV download: GET /api/applications/csv?key=YOUR_ADMIN_SECRET`);
});
