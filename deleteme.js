var db = require("./models");

db.reservations.create({
    date: new Date,
     sitter_id: 1,
     pet_id:1,
     service:"Dog Walking"
})