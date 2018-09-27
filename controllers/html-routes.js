var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function (req, res) {
    res.render("index");
});
router.get("/search", function (req, res) {
    res.render("search");
});

router.get("/manage", isLoggedIn, function (req, res) {
    db.reservations.findAll({}).then(function(results){
        res.render("manage", {reservations: results});
    })
    
});
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

module.exports = router;