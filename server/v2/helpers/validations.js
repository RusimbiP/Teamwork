import { check } from 'express-validator';
import Helper from './helper';

const { capitalizeFirstLetter, lowerCase } = Helper;

export const checkFirstname = _ => [
  check('firstname')
    .exists().withMessage('firstname is missing')
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage(
      'firstname cannot be blank',
    )
    .isAlpha()
    .withMessage('firstname can only contain alphabets ex: John')
    .isLength({ min: 2, max: 30 })
    .withMessage('firstname must be between 2 and 15 characters')
    .blacklist(' ')
    .trim()
    .customSanitizer((value) => capitalizeFirstLetter(value)),
];

export const checkLastName =_=> [
  check('lastname')
    .exists().withMessage('lastname is missing')
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage(
      'lastname cannot be blank',
    )
    .isAlpha()
    .withMessage('lastname can only contain alphabets ex: Doe')
    .isLength({ min: 2, max: 30 })
    .withMessage('lastname must be between 2 and 15 characters')
    .blacklist(' ')
    .trim()
    .customSanitizer((value) => capitalizeFirstLetter(value)),
];

export const checkEmail = _ => [
  check('email')
    .exists().withMessage('Email is missing')
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage(
      'Email cannot be blank',
    )
    .isEmail()
    .withMessage('Not a valid email address like for example:some1@some.com')
    .customSanitizer((value) => lowerCase(value))
    .blacklist(' '),
];
export const checkPassword = _ => [
  check('password')
    .exists().withMessage('password is missing')
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage(
      'password cannot be blank',
    )
    .isLength({ min: 6 })
    .withMessage('Password must contain at least 6 characters')
    .isLength({ max: 20 })
    .withMessage('Password can contain max 20 characters'),
];

export const checkGender = _ => [
  check('gender')
    .exists().withMessage('gender is missing')
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage(
      'Provide your gender. Male or Female',
    )
    .isAlpha()
    .withMessage(
      'gender must be alphabets and can either be Male or Female',
    )
    .trim()
    .blacklist(' ')
    .customSanitizer((value) => lowerCase(value))
    .isIn(['male', 'female'])
    .withMessage('gender must be either Male or Female'),
];

export const checkJobRole = _ => [
  check('jobrole')
    .exists().withMessage('jobrole is missing')
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage(
      'jobRole cannot be blank',
    )
    .isAlpha()
    .withMessage('jobRole can only contain alphabets ex: Accountant')
    .isLength({ min: 4, max: 50 })
    .withMessage('jobRole must be between 4 and 50 characters')
    .blacklist(' ')
    .trim(),
];

export const checkDepartment = _ => [
  check('department')
    .exists().withMessage('department is missing')
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage(
      'department cannot be blank',
    )
    .isAlpha()
    .withMessage('department can only contain alphabets ex: Human Resource')
    .isLength({ min: 4, max: 50 })
    .withMessage('department must be between 4 and 50 characters')
    .blacklist(' ')
    .trim(),

];

export const checkAddress = _ => [
  check('address')
  .exists().withMessage('address is missing')
  .not()
  .isEmpty({ ignore_whitespace: true })
  .withMessage(
    'address cannot be blank',
  )
  .matches('[A-Z]{2}')
  .withMessage('The first two characters of address be capital letters ie: KG 167 st')
  .matches('[ ]{1}[0-9]{3,}')
  .withMessage('Now add a  one space and your street address(1 character minimum) ex: KG 1')
  .matches('[A-Z]{2}[ ]{1}[0-9]{1,}[ ]{1}[A-Z]{1}[a-z]{1,2}$')
  .withMessage('Your address should look like KG 167 St or KN 7 Ave')
  .isLength({ min: 5, max: 50 })
  .withMessage('address must be between 5 and 30 characters')
  .blacklist(' ')
  .trim()
];

export const checkComment =_=> [
  check('comment')
    .exists().withMessage('comment is missing')
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage(
      'comment cannot be blank',
    )
    .isLength({ min: 1, max: 1000 })
    .withMessage('comment must be between 5 and 1000 characters')
    .blacklist(' ')
    .trim(),
];

export const checkId = _ => [
  check('articleid')
    .isNumeric()
    .withMessage('article id must be a number'),
];

export const checkTitle =_=> [
  check('title')
    .optional()
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage(
      'title cannot be blank',
    )
    .isLength({ min: 2, max: 100 })
    .withMessage('title must be between 5 and 100 characters')
    .trim()
];

export const checkSubTitle =_=> [
  check('subtitle')
    .optional()
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage(
      'subtitle cannot be blank',
    )
    .isLength({ min: 2, max: 100 })
    .withMessage('subtitle must be between 5 and 100 characters')
    .trim()
];

export const checkArticle =_=> [
  check('article')
    .optional()
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage(
      'subtitle cannot be blank',
    )
    .isLength({ min: 100 })
    .withMessage('article must be atleast 100 characters')
    .trim()
];