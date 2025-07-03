import express from 'express';
const router = express.Router();
import * as leadsController from '../controllers/leadsController.js';

router.get('/leads', leadsController.getAllLeads);
router.delete('/leads/:id', leadsController.deleteLead);

export default router;
