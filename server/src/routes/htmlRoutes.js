import path from 'path';
import { fileURLToPath } from 'url';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);
const router = Router();
router.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
    console.log(__dirname);
});
export default router;
