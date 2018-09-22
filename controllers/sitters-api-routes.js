var express = require("express");
var router = express.Router();
var passport = require('passport-local');
var session = require('express-session');


var db = require("../models");

router.post("/api/sitters", function (req, res) {
    db.sitters.findAll({
        where: {
          service: req.body.service,
          location: req.body.location
        }
      }).then(function (results) {
          console.log("RESULTS===========");
          console.log(results);
        var handlebarsObject = {
            sitters: results
        };
        res.json(handlebarsObject);
    });
});

router.post("/api/reservations", function (req, res) {
    db.reservations.create([
        "date", "customer_id", "sitter_id", "service"
    ], [
            req.body.date, req.body.customer_id, req.body.sitter_id, req.body.service
        ],
        function () {
            res.redirect("/manage");
        }
    )
});
module.exports = router;