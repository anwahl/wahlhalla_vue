
const { validationResult } = require('express-validator');
const db = require("../models");
const ObjectController = require("object.controller");
const AssignedTask = db.assignedTasks;
const Op = db.Sequelize.Op;

module.exports = class AssignedTaskController extends ObjectController {
    constructor(assignedTask) {
        super(assignedTask);
     }

    create = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const assignedTask = {
            person: req.body.person,
            task: req.body.task,
            type: req.body.type,
            timeOfDay: req.body.timeOfDay,
            dueDate: req.body.dueDate,
            complete: req.body.complete
        };
        AssignedTask.create(assignedTask)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the AssignedTask."
        });
        });
    };

    findByPerson= (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).jsonf({ errors: errors.array() });
        }7

        const person = req.query.person;
        var condition = person ? { person: { [Op.like]: `%${person}%` } } : null;
        AssignedTask.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving AssignedTask."
            });
        });
    };
}