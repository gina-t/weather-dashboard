import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TODO: Define route to serve index.html
// GET * should return the index.html file.
router.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
  return 
});
export default router;
