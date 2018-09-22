var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function (req, res) {
    res.render("index");
});
router.get("/search", function (req, res) {
    console.log(req.user)
    console.log('==================================')
    console.log(req.user.id);
    console.log('==================================')
    res.render("search");
});
router.get("/manage", function (req, res) {
    db.reservations.findAll({}).then(function(results){
        //console.log(results);
        res.render("manage", {reservations: results});
    })
    
});
module.exports = router;