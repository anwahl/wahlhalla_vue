const {check, validationResult} = require('express-validator');

exports.validateID= [
  check('id').notEmpty().withMessage("ID Required").isInt().withMessage("ID Must be Numerical"),
  (req, res, next) => {
    next();
  }
];

exports.validatePerson = [
    check('firstName').notEmpty().withMessage("First Name Required").trim().escape(),
    check('lastName').notEmpty().withMessage("Last Name Required").trim().escape(), 
    check('email').optional({checkFalsy: true}).isEmail().withMessage("Email is invalid"),
  (req, res, next) => {
    next();
  }
];

exports.validateName = [
  check('name').optional({checkFalsy: true}).trim().escape(),
(req, res, next) => {
  next();
}
];


