var LocalStrategy  = require('passport-local').Strategy;
var db = require('../models');

module.exports = function(passport) {
    
  
      passport.use('local-register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: true,
        //passReqToCallback : true
      },
        function(email, password, done) {
        console.log("Hit passport register")
          db.customers.findOne({ where: {email: email, password: password} }).then(function (err, customer) {
              console.log("Returned something");
              console.log(customer);
            if (err) { 
                console.log("Had an error! " + err);
                return done(err); }
            if (!customer) {
                //console.log("No customer")
                return done(null, false, req.flash('registerMessage', 'The email is already used')); 
            }
            if (!customer.verifyPassword(password)) { 
                //console.log("Bad password")
                return done(null, false); 
            }
            //console.log("Returning customer");
            return done(null, customer);
          });
        }
      ));
    
      passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: true,
        //passReqToCallback : true
      },
        function(username, password, done) {
        console.log("Hit passport login" + username + '  ' + password)
        
          db.customers.find({ where: {email: username, password: password} }).then(function (customer) {
            //   //console.log("Returned something");
            //   //console.log(customer);
            // if (err) { 
            //     //console.log("Had an error!");
            //     //console.log(err);
            //     return done(err); }
            if (!customer) {
                //console.log("No customer")
                return done(null, false, {message: 'Email not found'}); 
            }
            // // if (!customer { 
            // //     //console.log("Bad password")
            // //     return done(null, false); 
            // // }
            // //console.log("Returning customer");
            console.log(customer)
            return done(null, customer);
          });
        }
      ));


      passport.serializeUser(function(customer, done) {
        done(null, customer.id);
      });
       
      passport.deserializeUser(function(id, done) {
        console.log("Deserialize", id)
        db.customers.findById(id, function (err, customer) {
          console.log("results deserialize")
          console.log(err);
          console.log(customer)
            //instead of customer > rows then on next line rows[0]
            //%%%%//customer or customer.id
          done(err, customer);
        });
      });



}