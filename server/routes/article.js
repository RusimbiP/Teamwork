import { Router } from 'express';
import controller from '../controllers/article';
import { checkId } from '../helpers/validations';
import errorHandler from '../middleware/errorHandler';
import verifyToken from '../middleware/verifyToken';

const {
 write, getOne, edit, deleteArticle, getAll 
} = controller;
const articleUrl = Router();
articleUrl.get('/feed', verifyToken, getAll);
articleUrl.post('/', verifyToken, write);
articleUrl.get('/:articleId', checkId(), errorHandler, verifyToken, getOne);
articleUrl.patch('/:articleId', checkId(), errorHandler, verifyToken, edit);
articleUrl.delete('/:articleId', checkId(), errorHandler, verifyToken, deleteArticle);

export default articleUrl;

