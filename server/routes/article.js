import { Router } from 'express';
import controller from '../controllers/article';
import { checkId } from '../helpers/validations';
import errorHandler from '../middleware/errorHandler';
import verifyToken from '../middleware/verifyToken';

const { write, getOne} = controller;
const articleUrl = Router();

articleUrl.post('/', verifyToken, write);
articleUrl.get('/:articleId',verifyToken, getOne);


export default articleUrl;

