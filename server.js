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
app.use(express.static("./public"));

// Routes
// =============================================================
var apiRoutes = require("./controllers/controller.js");
var htmlRoutes = require("./controllers/htmlRoutes")

app.use(apiRoutes);
app.use(htmlRoutes);

// Starts the server to begin listening
// =============================================================
app.listen(process.env.PORT || 3000, function() {
    console.log('listening on 3000')
});