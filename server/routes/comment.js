import { Router } from 'express';
import controller from '../controllers/comment';
import { checkId, checkComment } from '../helpers/validations';
import errorHandler from '../middleware/errorHandler';
import verifyToken from '../middleware/verifyToken';


const { comment } = controller;
const commentUrl = Router();


commentUrl.post('/:articleId/comments', checkId(), checkComment(), errorHandler, verifyToken, comment);

export default commentUrl;
