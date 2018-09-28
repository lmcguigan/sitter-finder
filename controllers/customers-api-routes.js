var router = require('express').Router();
var passport = require('passport');
var db = require('../models');

<<<<<<< HEAD
// ---------------------------------------------------------
router.post('/api/customers/login', function(req, res, next) {
  passport.authenticate('local-login', function(error, user, info) {
      if(error) {
          return res.status(500).json(error);
      }
      if(!user) {
          return res.status(401).json(info.message);
      }
      res.json(user);
  })(req, res, next);
});
// ----------------------------------------------------------------



//Login Route
router.post('/api/customers/login',  passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash: true
}),
function(req, res) {
    console.log("hello");

    // if (req.body.remember) {
    //   req.session.cookie.maxAge = 1000 * 60 * 3;
    // } else {
    //   req.session.cookie.expires = false;
    // }
res.redirect('/');
});
=======
>>>>>>> 638aa8386c13c4583b9122cdb4bd951e661b6294

//Code from Andrew
// router.post('/api/customers/login', function(req, res, next) {
//   passport.authenticate('local-login', function(error, user, info) {
//       if(error) {
//           return res.status(500).json(error);
//       }
//       if(!user) {
//           return res.status(401).json(info.message);
//       }
//       res.json(user);
//   })(req, res, next);
// });

//Code from Andrew


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
