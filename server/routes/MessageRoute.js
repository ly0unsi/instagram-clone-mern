import express from 'express';
import { addMessage, getMessages, readMessage } from '../controllers/MessageController.js';

const router = express.Router();

router.post('/', addMessage);
router.put('/read/:chatId', readMessage);
router.get('/:chatId', getMessages);

export default router