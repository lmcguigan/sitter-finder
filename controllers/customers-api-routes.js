var router = require('express').Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true
  },
    function(username, password, done) {
      db.customers.findOne({ username: username }, function (err, customer) {
        if (err) { return done(err); }
        if (!customer) { return done(null, false); }
        if (!customer.verifyPassword(password)) { return done(null, false); }
        return done(null, customer);
      });
    }
  ));
  
  passport.serializeUser(function(customer, done) {
    done(null, customer.id);
  });
   
  passport.deserializeUser(function(id, done) {
    db.customers.findById({where: {id: id}}, function (err, customer) { 
        //instead of customer > rows then on next line rows[0]
        //%%%%//customer or customer.id
      done(err, customer);
    });
  });


    router.post('/api/customers', 
    passport.authenticate('local-register'), 
    function(req, res) {
        db.customers.create({
            name: req.body.name,
            zipcode: req.body.zipcode,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            address: req.body.address,
        }
    ).then(function() {
            res.redirect('/');
        });
    });

  
    router.get('/api/customers', function(req, res) {
        db.customers.findAll().then(function(result) {
            res.json(result);
        });
    });

    router.get('/api/customers/name', function(req, res) {
        db.customers.findOne({ where: {
            name: req.params.name
        }
        }).then(function(result) {
            res.json(result);
        });
    });
//login authenticate
    router.post('/api/customers', passport.authenticate('local-login', {
        failureRedirect: '/',   //should redirect to modal --how to translate it???
        successRedirect: '/'    //should redirect to home page

    }), function(req, res) {
        console.log('success');
        res.redirect('/')
    });

    
    module.exports = router;
