import express from 'express';
import { addMessage, getMessages, getUserMessages, readMessage } from '../controllers/MessageController.js';

const router = express.Router();

router.post('/', addMessage);
router.put('/read/:chatId', readMessage);
router.get('/:chatId', getMessages);
router.get('/user/:userId', getUserMessages);

export default router