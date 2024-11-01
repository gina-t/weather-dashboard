import express from 'express';
const router = express.Router();
import apiRoutes from './api/index.js';
import htmlRoutes from './htmlRoutes.js';

router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

export default router;
