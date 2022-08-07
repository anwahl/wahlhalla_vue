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

exports.validateDescription = [
  check('description').optional({checkFalsy: true}).trim().escape(),
  (req, res, next) => {
    next();
  }
];

exports.validateSubtask = [
  check('assignedTask').notEmpty().withMessage("Assigned Task Required").isInt(),
  check('description').notEmpty().withMessage("Description Required").trim().escape(),
  (req, res, next) => {
    next();
  }
];

exports.validateTaskType = [
  check('description').notEmpty().withMessage("Description Required").trim().escape(),
  check('category').notEmpty().isIn(['CHORE','BILL','APPOINTMENT','LIST','OTHER']).withMessage("Category must be 'CHORE','BILL','APPOINTMENT','LIST', or 'OTHER'"),
  (req, res, next) => {
    next();
  }
];

exports.validateTaskCategory = [
  check('category').notEmpty().isIn(['CHORE','BILL','APPOINTMENT','LIST','OTHER']).withMessage("Category must be 'CHORE','BILL','APPOINTMENT','LIST', or 'OTHER'"),
  (req, res, next) => {
    next();
  }
];

exports.validateTask = [
  check('type').notEmpty().withMessage("Type Required").isInt(),
  check('target').notEmpty().withMessage("Target Required").isInt(),
  check('description').notEmpty().withMessage("Description Required").trim().escape(),
  check('value').optional({checkFalsy: true}).isInt().withMessage("Value must be a whole number."),
  (req, res, next) => {
    next();
  }
];

exports.validateTarget = [
  check('type').notEmpty().withMessage("Type Required").isInt(),
  check('description').notEmpty().withMessage("Description Required").trim().escape(),
  (req, res, next) => {
    next();
  }
];

exports.validateTargetType = [
  check('description').notEmpty().withMessage("Description Required").trim().escape(),
  (req, res, next) => {
    next();
  }
];

exports.validateAssignedTask = [
  check('person').notEmpty().withMessage("Person Required").isInt(),
  check('task').notEmpty().withMessage("Task Required").isInt(),
  check('type').notEmpty().isIn(['YEARLY','MONTHLY','WEEKLY','DAILY','STANDALONE']).withMessage("Type must be 'YEARLY','MONTHLY','WEEKLY','DAILY', or 'STANDALONE'"),
  check('timeOfDay').optional({checkFalsy: true}).matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage("Time must be valid hh:mm format."),
  check('dueDate').notEmpty().isDate().withMessage("Date must be valid format."),
  check('complete').notEmpty().isBoolean().withMessage("Complete must be true or false."),
  (req, res, next) => {
    next();
  }
];

exports.validateAssignedTaskQuery = [
  check('person').optional({checkFalsy: true}).isInt(),
  check('type').optional({checkFalsy: true}).isIn(['YEARLY','MONTHLY','WEEKLY','DAILY','STANDALONE']).withMessage("Type must be 'YEARLY','MONTHLY','WEEKLY','DAILY', or 'STANDALONE'"),
  check('dueDate').optional({checkFalsy: true}).isDate().withMessage("Date must be valid format."),
  check('complete').optional({checkFalsy: true}).isBoolean().withMessage("Complete must be true or false."),
  (req, res, next) => {
    next();
  }
];

exports.validateAssignedTaskType =[
  check('type').notEmpty().isIn(['YEARLY','MONTHLY','WEEKLY','DAILY','STANDALONE']).withMessage("Type must be 'YEARLY','MONTHLY','WEEKLY','DAILY', or 'STANDALONE'"),
  (req, res, next) => {
    next();
  }
];

exports.validateCompletion =[
  check('complete').notEmpty().isBoolean().withMessage("Complete must be true or false."),
  (req, res, next) => {
    next();
  }
];

exports.validateDueDate =[
  check('dueDate').notEmpty().isDate().withMessage("Date must be valid format."),
  (req, res, next) => {
    next();
  }
];

exports.validateTypeID = [
  check('type').notEmpty().withMessage("Type Required").isInt().withMessage("ID Must be Numerical"),
  (req, res, next) => {
    next();
  }
];

exports.validateTargetID = [
  check('target').notEmpty().withMessage("Target Required").isInt().withMessage("ID Must be Numerical"),
  (req, res, next) => {
    next();
  }
];

exports.validateTaskID = [
  check('type').notEmpty().withMessage("Task Required").isInt().withMessage("ID Must be Numerical"),
  (req, res, next) => {
    next();
  }
];

exports.validateAssignedTaskID = [
  check('assignedTask').notEmpty().withMessage("Assigned Task Required").isInt().withMessage("ID Must be Numerical"),
  (req, res, next) => {
    next();
  }
];

exports.validatePersonID = [
  check('person').notEmpty().withMessage("Person Required").isInt().withMessage("ID Must be Numerical"),
  (req, res, next) => {
    next();
  }
];