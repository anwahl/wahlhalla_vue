
const { validationResult } = require('express-validator');
const db = require("../models");
const ObjectController = require("./object.controller.js");
const AssignedTask = db.assignedTasks;
const Op = db.Sequelize.Op;
const url = require('url');

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

    findByPerson = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).jsonf({ errors: errors.array() });
        }7

        const person = req.query.person;
        var condition = person ? { person: { [Op.eq]: person } } : null;
        AssignedTask.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving AssignedTasks."
            });
        });
    };
    
    findByType = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).jsonf({ errors: errors.array() });
        }7

        const person = req.query.person;
        var type = person ? { type: { [Op.eq]: type } } : null;
        AssignedTask.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving AssignedTasks."
            });
        });
    };

    findByCompletion = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const complete = req.query.complete;
        var condition = complete ? { complete: { [Op.eq]: complete } } : null;
        AssignedTask.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving AssignedTasks."
            });
        });
    };

    findByDueDate = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const dueDate = req.query.dueDate;
        var condition = dueDate ? { dueDate: { [Op.eq]: dueDate } } : null;
        AssignedTask.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving AssignedTasks."
            });
        });
    };

    
    findByQuery = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const dueDate = url.parse(req.url, true).query.dueDate;
        const complete = url.parse(req.url, true).query.complete;
        const type = url.parse(req.url, true).query.type;
        const person = url.parse(req.url, true).query.person;

        //var condition = dueDate ? { dueDate: { [Op.eq]: dueDate } } : null;

        var condition = {
            [Op.and]: [
                dueDate ? { dueDate: dueDate } : null,
                complete ? { complete: complete } : null,
                type ? { type: type } : null,
                person ? { person: person } : null,
            ]
        };

        AssignedTask.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving AssignedTasks."
            });
        });
    };
}