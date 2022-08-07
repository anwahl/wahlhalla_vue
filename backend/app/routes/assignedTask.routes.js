module.exports = app => {
    const AssignedTask = require("../controllers/assignedTask.controller.js");
    const validator = require("../validators/validator");
    var router = require("express").Router();
    const db = require("../models");
    const _assignedTask = db.persons;
    var assignedTask = new AssignedTask(_assignedTask);

    router.get("/", assignedTask.findAll);
    router.post("/",  validator.validateAssignedTask, assignedTask.create);
    router.get("/:id", validator.validateID, assignedTask.findOne);
    router.put("/:id", validator.validateID, validator.validateAssignedTask, assignedTask.update);
    router.delete("/:id", validator.validateID, assignedTask.delete);
    router.get("/person/:person", validator.validatePersonID, assignedTask.findByPerson);
    router.get("/type/:type", validator.validateAssignedTaskType, assignedTask.findByType);
    router.get("/completion/:complete",  validator.validateCompletion, assignedTask.findByCompletion);
    router.get("/dueDate/:dueDate",  validator.validateDueDate, assignedTask.findByDueDate);
    router.get("/query/", validator.validateAssignedTaskQuery, assignedTask.findByQuery);
    app.use('/api/assignedTask', router);
};