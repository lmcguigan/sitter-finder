var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;
// =============================================================
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//static files to be served
app.use(express.static("public"));

// Routes
// =============================================================
var apiCustomers = require("./controllers/apiCustomers.js");
var apiReservations = require("./controllers/apiReservations.js");
var apiSitters = require("./controllers/apiSitters.js");
var apiLogin = require("./controllers/apiLogin.js");
var htmlRoutes = require("./controllers/htmlRoutes.js");
app.use(apiCustomers);
app.use(apiReservations);
app.use(apiSitters);
app.use(apiLogin);
app.use(htmlRoutes);

// Starts the server to begin listening
// =============================================================
app.listen(process.env.PORT || 3000, function() {
    console.log('listening on 3000')
});