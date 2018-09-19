var express = require("express");
var router = express.Router();
var passport = require('passport-local');
var session = require('express-session');

var db = require('../models');

// router.get('/', function(req, res) {
//     res.send('invalid endpoint');
//})
    router.post('/api/customers', function(req, res) {
        console.log(req.body);
        db.customers.create({
            name: req.body.name,
            zipcode: req.body.zipcode,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            address: req.body.address,
        }).then(function(result) {
            res.json(result);
        });
    });

    router.get('/api/customers', function(req, res) {
        db.customers.findAll().then(function(result) {
            res.json(result);
        });
    });

    router.get('/api/customers/name', function(req, res) {
        db.customer.findOne({ where: {
            name: req.params.name
        }
        }).then(function(result) {
            res.json(result);
        });
    });
//login authenticate
    // router.post('/login', passport.authenticate('local-login', {
    //     successRedirect: '/manage',
    //     failureRedirect: '/index',
    //     failureFlash: true

    // }), function(req, res) {
    //     console.log('success');
    //     res.redirect('/')
    // })

    // register authenticate
    // router.post('/signup', passport.authenticate('local-signup', {
	// 	successRedirect : '',
	// 	failureRedirect : '/'
		
	// }));
    module.exports = router;