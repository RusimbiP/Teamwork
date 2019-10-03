import { validationResult } from 'express-validator';


const errorHandler = (req, res, next) => {
  const errors = {};

  const errorFormatter = ({ location, msg, param }) => {
    if (!Object.keys(errors).includes(location)) {
      errors[`${location}`] = {};
    }
    errors[`${location}`][`${param}`] = msg;

    return errors;
  };

  const validationResults = validationResult(req).array({ onlyFirstError: true });

  validationResults.forEach((resultObject) => errorFormatter(resultObject));

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ status: 400, errors });
  } else {
    next();
  }
};

export default errorHandler;
