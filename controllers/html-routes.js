var express = require("express");
var router = express.Router();
router.get("/", function (req, res) {
    res.render("index");
});
router.get("/search", function (req, res) {
    res.render("search");
});
router.get("/manage", function (req, res) {
    res.render("manage");
});
module.exports = router;