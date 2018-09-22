var express = require("express");
var router = express.Router();
var db = require("../models");

console.log("Running page")

router.delete('/api/delete', function(req, res){
    console.log("Hit delete route");
    db.reservations.destroy({
        where: {
            id: req.body.id
        }
    })
})

router.put('/api/update', function(req, res){
    console.log("Hit update route");
    db.reservations.update(
        req.body,
        {
        where: {
            id: req.body.id
        }
    })
})

module.exports = router;

// TO BE FINISHED