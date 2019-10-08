import { Router } from 'express';
import controller from '../controllers/user';
import { 
  checkFirstname, checkLastName, checkEmail, 
  checkPassword, checkGender, checkJobRole,
  checkDepartment, checkAddress }from '../helpers/validations';
import errorHandler from '../middleware/errorHandler';
import { check } from 'express-validator';
const { create, login } = controller;


const userUrl = Router();


userUrl.post('/signup', 
checkFirstname(),
  checkLastName(),
  checkEmail(),
  checkGender(),
  checkJobRole(),
  checkDepartment(),
  checkAddress(),
  checkPassword(),
  errorHandler,
  create
);

userUrl.post('/signin', checkEmail(), checkPassword(), errorHandler, login)
export default userUrl;
