import { Router } from 'express';
import controller from '../controllers/article';
import { checkId } from '../helpers/validations';
import errorHandler from '../middleware/errorHandler';
import verifyToken from '../middleware/verifyToken';

const { write, getOne, edit } = controller;
const articleUrl = Router();

articleUrl.post('/', verifyToken, write);
articleUrl.get('/:articleId', checkId (), errorHandler, verifyToken, getOne);
articleUrl.patch('/:articleId',checkId (), errorHandler, verifyToken, edit);

export default articleUrl;

