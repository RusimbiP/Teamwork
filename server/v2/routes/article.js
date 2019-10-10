import { Router } from 'express';
import controller from '../controllers/article';
import Auth from '../middleware/verifyToken';
import { checkId } from '../helpers/validations';
import errHandler from '../middleware/errorHandler';


const { writeArticle, editArticle } = controller;
const articleUrl = Router();

articleUrl.post('/', Auth.verifyToken, writeArticle);
articleUrl.patch('/:articleid', checkId(), errHandler, Auth.verifyToken, editArticle);

export default articleUrl;
