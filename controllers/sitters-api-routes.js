



//  THIS IS THE CODE IMPORTED FROM THE PREVIOUS FILE NAMED CONTROLLERS.JS





var express = require("express");
var router = express.Router();
var passport = require('passport-local');
var session = require('express-session');


var db = require("../models");

//Create all routes

router.get("/api/sitters", function (req, res) {
    console.log(req.body);
    db.sitters.findAll({}).then(function (results) {
        var handlebarsObject = {
            sitters: data
        };
        res.render("search", handlebarsObject)
        console.log(results);
        return res.json(results);
    });
});

router.post("/api/reservations", function (req, res) {
    model.create([
        "zip_code", "service_selection", "time_required"
    ], [
            req.body.zip_code, req.body.service_selection, req.body.time_required
        ],
        function () {
            res.redirect("/");
        }
    )
});

router.put("/manage/:id", function (req, res) {
    var updateReservation = "id = " + req.params.id;

    model.update({
        zip_code: req.body.zip_code,
        service_selection: req.body.service_selection,
        time_required: req.body.time_required
    }, updateReservation, function () {
        res.redirect("/");
    });
});

router.delete("/manage/delete/:id", function (req, res) {
    var deleteReservation = "id = " + req.params.id;

    model.delete(deleteReservation, function () {
        res.redirect("/");
    });
});

module.exports = router;
