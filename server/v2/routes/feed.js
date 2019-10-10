import { Router } from 'express';
import controller from '../controllers/article';
import Auth from '../middleware/verifyToken';
import { checkId } from '../helpers/validations';
import errHandler from '../middleware/errorHandler';

const { getFeed } = controller;

const feedUrl = Router();

feedUrl.get('/feed', Auth.verifyToken, getFeed);

export default feedUrl;
