const express = require('express');
const router = express.Router();
const path = require('path');
const data = {};

data.employees = require('../../data/employees.json');

router.route('/')
    //--Read
    .get((req, res) => {
        res.json(data.employees);
    })
    //--Create
    .post((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        });
    })
    //--Update
    .put((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        });
    })
    //--Delete
    .delete((req, res) => {
        res.json({
            "id": req.body.id,
        });
    })

router.route('/:id')
    .get((req, res) => {
        res.json({ "id": req.params.id });
    })

module.exports = router;