import { Router } from 'express';
const router = Router();
import apiRoutes from './api/apiIndex';
import htmlRoutes from './htmlRoutes';

router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

export default router;
