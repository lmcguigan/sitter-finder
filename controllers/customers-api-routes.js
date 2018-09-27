var router = require('express').Router();
var passport = require('passport');
var db = require('../models');

//Login Route
router.post('/api/customers/login',
  passport.authenticate('local-signin'),function(req, res) {
    console.log("REQ USER LOGIN", req.user);
    res.json({success:true, user:req.user});
  });


router.get('/reservations', isLoggedIn, function (req, res) {
  res.render('manage', {
    user: req.user // get the user out of session and pass to template
  });
});



//Register Route
router.post('/api/customers/register', passport.authenticate('local-signup'), function(req, res){
  res.json({success:true, user:req.user});
});

//Logout Route
router.get('/api/customers/logout', function (req, res) {
  req.logout();
  //req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}



module.exports = router;