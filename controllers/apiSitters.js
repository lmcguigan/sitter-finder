var express = require("express");
var router = express.Router();

var sitters = require("../models/sitter.js");

//Create all routes

router.get("/api/sitter", function(req, res) {
    sitters.all(function(data) {
        var sitterObject = {
            sitters: data
        };
        res.render("index", sitterObject);
    });
});

module.exports = router;