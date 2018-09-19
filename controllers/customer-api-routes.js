var express = require("express");
var router = express.Router();
// var passport = require('passport-local');
// var session = require('express-session');

var db = require('../models');


    router.post('/api/customers', function(req, res) {
        db.customers.create(req.body).then(function(result) {
            res.json(result);
        });
    });

    // app.get('/api/customer', function(req, res) {
    //     db.customer.findAll().then(function(result) {
    //         res.json(result);
    //     });
    // });

    // app.get('/api/customer/name', function(req, res) {
    //     db.customer.findOne({ where: {
    //         name: req.params.name
    //     }
    //     }).then(function(result) {
    //         res.json(result);
    //     });
    // });

    module.exports = router;