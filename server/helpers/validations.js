import { check } from 'express-validator';
import Helper from '../helpers/helper'
const {capitalizeFirstLetter, lowerCase } = Helper;

export const checkFirstname =_=>[
  check('firstName')
    .isLength({ min: 2, max: 30 })
    .withMessage('FirstName must be between 2 and 15 characters')
    .isAlpha()
    .withMessage('FirstName can only contain alphabets ex: John')
    .blacklist(' ')
    .trim()
    .stripLow()
    .customSanitizer(value => capitalizeFirstLetter(value)),
]

export const checkLastName =_=>[
  check('lastName')
    .isLength({ min: 2, max: 30 })
    .withMessage('LastName must be between 2 and 15 characters')    
    .blacklist(' ')
    .trim()
    .stripLow()
    .isAlpha()
    .withMessage('LastName can only contain alphabets ex: Doe')
    .customSanitizer(value => capitalizeFirstLetter(value)),
]

export const checkEmail =_=> [
  check('email')
    .isEmail()
    .withMessage('Provide a email address eg:some1@some.com')
    .customSanitizer(value => lowerCase(value))
    .blacklist(' '),
]
export const checkPassword =_=> [
  check('password')
   .isLength({ min: 6})
   .withMessage("Password must contain at least 6 characters")
   .isLength({ max: 20 })
   .withMessage("Password can be max 20 characters max"),
 ]

 export const checkGender =_=> [
  check('gender')
    .trim()
    .blacklist(' ')
    .customSanitizer(value => lowerCase(value))
    .isIn(['male', 'female'])
    .withMessage('gender must be either Male or Female. So, Which one are you?'),
]

export const checkJobRole =_=>[
  check('jobRole')   
    .stripLow()
    .isLength({ min: 4, max: 50 })
    .withMessage('jobRole must be between 4 and 50 characters')
    .blacklist(' ')
    .isAlpha()
    .withMessage('jobRole can only contain alphabets ex: Accountant')
    .trim()
]

export const checkDepartment =_=>[
  check('department')
    .trim()
    .isLength({ min: 4, max: 50 })
    .withMessage('department must be between 4 and 50 characters')
    .isAlpha()
    .withMessage('department can only contain alphabets ex: Human Resource')
    .blacklist(' ')
    .stripLow()
]

export const checkAddress =_=>[
  check('address')
    .matches('[A-Z]{2}')
    .withMessage('Give an address whose first two characters of address be capital letters ie: KG 167 St')
    .matches('[ ]{1}[0-9]{3,}')
    .withMessage('Now add a  one space and your street address(1 character minimum) ex: KG 1')
    .matches('[A-Z]{2}[ ]{1}[0-9]{1,}[ ]{1}[A-Z]{1}[a-z]{1,2}$')
    .withMessage('Your address should look like KG 167 St or KN 7 Ave')
    .isLength({ min: 5, max: 50 })
    .withMessage('address must be between 5 and 30 characters')
    .blacklist(' ')
    .trim()
    .stripLow()
]
