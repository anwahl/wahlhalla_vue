
const { validationResult } = require('express-validator');
const db = require("../models");
const TaskType = db.taskTypes;
const Op = db.Sequelize.Op;

module.exports = class TaskTypeController extends ObjectController {
    constructor(taskType) {
        super(taskType);
     }

    create = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const taskType = {
            task: req.body.task,
            type: req.body.type
        };
        TaskType.create(taskType)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the TaskType."
        });
        });
    };
    findByType= (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const type = req.query.type;
        var condition = type ? { type: { [Op.like]: `%${type}%` } } : null;
        TaskType.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving TaskType."
            });
        });
    };
}