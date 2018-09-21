var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var passport = require('passport-local');
var session = require('express-session');

var PORT = process.env.PORT || 3000;
// =============================================================
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//static files to be served
app.use(express.static("public"));

// db modules
var db = require("./models");


// Routes
// =============================================================
var htmlRoutes = require("./controllers/html-routes");
var customerRoutes = require("./controllers/customers-api-routes");
var sitterRoutes = require("./controllers/sitters-api-routes");
var registrationRoutes = require("./controllers/sitters-api-routes");

app.use(htmlRoutes);
app.use(customerRoutes);
app.use(sitterRoutes);
app.use(registrationRoutes);




// Starts the server to begin listening
// =============================================================
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});