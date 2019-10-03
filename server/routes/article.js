import { Router } from 'express';
import controller from '../controllers/article';
import errorHandler from '../middleware/errorHandler';
import verifyToken from '../middleware/verifyToken';
const { write } = controller;
const articleUrl = Router();

articleUrl.post('/', verifyToken, write);

export default articleUrl;

