var router = require('express').Router();
var passport = require('passport');
var db = require('../models');

//Login Route
router.post('/api/customers/login',  passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash: true
}),
function(req, res) {
    console.log("hello");
    
res.redirect('/');
});

function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}


router.get('/reservations', isLoggedIn, function(req, res) {
  res.render('manage', {
    user : req.user // get the user out of session and pass to template
  });
});



//Register Route
router.post('/api/customers/register',

  function (req, res) {
    console.log("Hitting register route" + req.body.zipcode)

    db.customers.create({
      name: req.body.name,
      zipcode: req.body.zipcode,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
    }
    ).then(function (err) {
      passport.authenticate('local-register', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
      })   
      res.send({success: true, message: 'You are registered' });
    }
    ).catch(function (err) {
      res.send({success: false, message: err.message });
    })

  });

//Logout Route
router.get('/api/customers/logout', function(req, res) {
  req.logout();
  //req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

module.exports = router;






// router.get('/register', function (req, res) {
//   res.render('/', { message: req.flash('registerMessage') })
// })



// router.post('/register', function(req, res) {
//     ////console.log("Hitting register route")
//     db.customers.findOne({where: {
//       email: req.body.email}}).then(function(customer) {
//         if(customer) {
//           req.flash('error_msg', 'Email already regsitered');
//         res.redirect('/');
//         } else {
//           db.customers.create({
//             name: req.body.name,
//             zipcode: req.body.zipcode,
//             email: req.body.email,
//             password: req.body.password,
//             phone: req.body.phone,
//             address: req.body.address
//           }).then(function() {
//             req.flash('success_msg', 'You are now registered and can log in');
//                 res.redirect('/');
//           })


//login Routes
// router.post('/api/customers/login', 
// passport.authenticate('local-login', {
//   successRedirect: '/',
//   failureRedirect: '/',
//   failureFlash: true
// }), function(req, res) {
//     console.log("Hitting login route")
//     db.customers.findAll({where: {
//         email: req.body.email,
//         password: req.body.passport}}).then(function() {
//             res.redirect('/');
//         });  
// });

// router.get('/api/customers/login', function(req, res) {
//   res.render('/', {message: req.flash('loginMessage')})
// })

// router.get('/logout', (req, res) => {
//   req.logout();
//   req.flash('success_msg', 'You are logged out');
//   res.redirect('/users/login');
// });