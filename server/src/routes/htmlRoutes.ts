import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);
console.log(__dirname);
const __parentDir = path.resolve(__dirname, '../../..');
console.log(__parentDir);


// TODO: Define route to serve index.html
router.get('*', (_req, res) => {
  res.sendFile(path.join(__parentDir, '/client/dist'));
});

export default router;
