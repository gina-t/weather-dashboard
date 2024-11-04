import express from 'express';
const router = express.Router();
import weatherRoutes from './weatherRoutes';
router.use('/weather', weatherRoutes);
export default router;