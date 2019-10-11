import { Router } from 'express';
import controller from '../controllers/article';
import Auth from '../middleware/verifyToken';
import { checkId, checkArticle, checkTitle, checkSubTitle } from '../helpers/validations';
import errHandler from '../middleware/errorHandler';


const { writeArticle, editArticle, deleteArticle, writeComment, getOneArticle } = controller;
const articleUrl = Router();

articleUrl.post('/', Auth.verifyToken, writeArticle);

articleUrl.patch('/:articleid', 
checkId(), 
checkTitle(), 
checkSubTitle(),
checkArticle(), 
errHandler, Auth.verifyToken, editArticle);

articleUrl.delete('/:articleid', checkId(), errHandler, Auth.verifyToken, deleteArticle);

articleUrl.post('/:articleid/comments', checkId(), errHandler, Auth.verifyToken, writeComment);

articleUrl.get('/:articleid', checkId(), errHandler, Auth.verifyToken, getOneArticle);

export default articleUrl;
