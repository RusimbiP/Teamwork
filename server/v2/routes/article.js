import { Router } from 'express';
import controller from '../controllers/article';
import Auth from '../middleware/verifyToken';
import { checkId } from '../helpers/validations';
import errHandler from '../middleware/errorHandler';


const { write, edit } = controller;
const articleUrl = Router();

articleUrl.post('/', Auth.verifyToken, write);
articleUrl.patch('/:articleid', checkId(), errHandler, Auth.verifyToken, edit);

export default articleUrl;
