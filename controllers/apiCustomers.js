var express = require("express");
var router = express.Router();

var model = require("../models/customer.js");

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

module.exports = router;