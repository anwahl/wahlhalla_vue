module.exports = app => {
    const person = require("../controllers/person.controller.js");
    const validator = require("../validators/validator");
    var router = require("express").Router();
    
    router.get("/", person.findAll);
    router.post("/",  validator.validatePerson, person.create);
    router.get("/:id", validator.validateID, person.findOne);
    router.put("/:id", validator.validateID, validator.validatePerson, person.update);
    router.delete("/:id", validator.validateID, person.delete);
    router.get("/:name", validator.validateName, person.delete);
    app.use('/api/person', router);
  };