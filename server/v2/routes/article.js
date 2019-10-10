import { Router } from 'express';
import controller from '../controllers/article';
import Auth from '../middleware/verifyToken';
import { checkId } from '../helpers/validations';
import errHandler from '../middleware/errorHandler';
import { check } from 'express-validator';


const { writeArticle, editArticle, deleteArticle } = controller;
const articleUrl = Router();

articleUrl.post('/', Auth.verifyToken, writeArticle);
articleUrl.patch('/:articleid', checkId(), errHandler, Auth.verifyToken, editArticle);
articleUrl.delete('/:articleid', checkId(), Auth.verifyToken, deleteArticle);

export default articleUrl;
