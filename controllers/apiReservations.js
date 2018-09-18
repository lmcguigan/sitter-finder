var express = require("express");
var router = express.Router();

var model = require("../models/reservation.js");

//Create all routes

router.get("/api/", function(req, res) {
    model.all(function(data) {
        var modelObject = {
            tableName: data
        };
        res.render("index", modelObject);
    });
});

router.post("/api/", function(req, res) {
    model.create([
        "zip_code", "service_selection", "time_required"
    ], [
        req.body.zip_code, req.body.service_selection, req.body.time_required
    ],
    function() {
        res.redirect("/");
    }
)
});

router.put("/manage/:id", function(req, res) {
    var updateReservation = "id = " + req.params.id;

    model.update({
        zip_code: req.body.zip_code, 
        service_selection: req.body.service_selection,
        time_required: req.body.time_required
    }, updateReservation, function() {
        res.redirect("/");
    });
});

router.delete("/manage/delete/:id", function(req, res) {
    var deleteReservation = "id = " + req.params.id;

    model.delete(deleteReservation, function () {
        res.redirect("/");
    });
});

module.exports = router;