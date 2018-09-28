var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function (req, res) {
    console.log("USER:");
    console.log(req.user);
    var user = req.user;
    res.render("index", { user });
});
router.get("/search", function (req, res) {
    console.log("USER:");
    console.log(req.user);
    var user = req.user;
    res.render("search", { user });
});

router.get("/manage", isLoggedIn, function (req, res) {
    console.log("USER:");
    console.log(req.user);
    var user = req.user;
    db.reservations.findAll({}).then(function (results) {
        res.render("manage", { reservations: results, user: user});
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