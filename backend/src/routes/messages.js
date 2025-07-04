import express from 'express';
const router = express.Router();
import * as messagesController from '../controllers/messagesController.js';

router.post('/messages', messagesController.createMessage);
router.get('/messages/:identifier', messagesController.getMessagesByIdentifier);

export default router;
