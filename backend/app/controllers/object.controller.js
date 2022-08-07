const { validationResult } = require('express-validator');

module.exports = class ObjectController {
    constructor(model) {
        this._model = model;
    }

    findAll = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        this._model.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving " + this._model + "."
            });
        });
    };
        
    findOne = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        this._model.findByPk(id)
        .then(data => {
            if (data) {
            res.send(data);
            } else {
            res.status(404).send({
                message: `Cannot find ${this._model} with id=${id}.`
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: "Error retrieving " + this._model + " with id=" + id
            });
        });
    };
    
    update = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        this._model.update(req.body, {
        where: { id: id }
        })
        .then(num => {
            if (num == 1) {
            res.send({
                message: this._model + " was updated successfully."
            });
            } else {
            res.send({
                message: `Cannot update ${this._model} with id=${id}. Maybe ${this._model} was not found or req.body is empty!`
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: "Error updating " + this._model + " with id=" + id
            });
        });
    };
        
    delete = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const id = req.params.id;
        this._model.destroy({
        where: { id: id }
        })
        .then(num => {
            if (num == 1) {
            res.send({
                message: this._model + " was deleted successfully!"
            });
            } else {
            res.send({
                message: `Cannot delete ${this._model} with id=${id}. Maybe ${this._model} was not found!`
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: "Could not delete " + this._model + " with id=" + id
            });
        });
    };
}