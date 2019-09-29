import controller from '../controllers/user';
const { create } = controller;
import { 
  checkFirstname, checkLastName, checkEmail, 
  checkPassword, checkGender, checkJobRole,
  checkDepartment, checkAddress
}
from '../helpers/validations';
import errorHandler from '../middleware/errorHandler';
import { Router } from 'express';


const userUrl = Router();


userUrl.post('/signup', checkFirstname(), 
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




export default userUrl;
