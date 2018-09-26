var express = require("express");
var router = express.Router();
var passport = require('passport-local');
var session = require('express-session');


var db = require("../models");
router.get("/api/sitters", function (req, res){
    db.sitters.findAll({}).then(function (results){
        console.log(results);
        res.json(results);
    });
});

router.post("/api/sitters", function (req, res) {
    db.sitters.findAll({
        where: {
          service: req.body.service,
          location: req.body.location
        }
      }).then(function (results) {
        var handlebarsObject = {
            sitters: results
        };
        res.json(handlebarsObject);
    });
});

router.post("/api/reservations", function (req, res) {
    db.reservations.create({
        date: req.body.date,
        customerId: req.body.customer_id,
        sitter_id: req.body.sitter_id,
        sittername: req.body.sitter_name,
        service: req.body.service
    }).then(function (results){
        console.log(results);
        db.reservations.findAll({
            where: {
                customerId: req.body.customer_id
            }
        }).then(function(results){
            //console.log(results);
            res.render("manage", {reservations: results});
        })
    })
});
module.exports = router;