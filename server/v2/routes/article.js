import { Router } from 'express';
import controller from '../controllers/article';
import Auth from '../middleware/verifyToken';

const { write } = controller;
const articleUrl = Router();

articleUrl.post('/', Auth.verifyToken, write);

export default articleUrl;
