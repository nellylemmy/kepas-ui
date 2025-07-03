import express from 'express';
const router = express.Router();
import * as messagesController from '../controllers/messagesController.js';

router.post('/messages', messagesController.createMessage);

export default router;
