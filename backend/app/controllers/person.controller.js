
const { validationResult } = require('express-validator');
const db = require("../models");
const Person = db.persons;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const person = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    };
    Person.create(person)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Person."
      });
    });
};
exports.findAll = (req, res) => {
    Person.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving People."
        });
    });
};
exports.findOne = (req, res) => {
    const id = req.params.id;
    Person.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Person with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Person with id=" + id
        });
      });
};
exports.update = (req, res) => {
    const id = req.params.id;
    Person.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Person was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Person with id=${id}. Maybe Person was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Person with id=" + id
        });
      });
};
exports.delete = (req, res) => {
    const id = req.params.id;
    Person.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Person was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Person with id=${id}. Maybe Person was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Person with id=" + id
        });
      });
};
exports.findByName = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.or]: [
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('firstName')), 'LIKE', `%${name}%`),
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('lastName')), 'LIKE', `%${name}%`),
                ] } } : null;
    Person.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving People."
        });
      });
};