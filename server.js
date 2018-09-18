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

// db modules
var db = require("./models");


// Routes
// =============================================================
var customerRoutes = require("./controllers/customer-api-routes.js");
//var sitterRoutes = require("./controllers/sitter-api-routes.js");
var htmlRoutes = require("./controllers/html-routes");
app.use(customerRoutes);
app.use(htmlRoutes);
//app.use(sitterRoutes);

// Starts the server to begin listening
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });