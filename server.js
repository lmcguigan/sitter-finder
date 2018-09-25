var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var moment= require("moment");

var PORT = process.env.PORT || 3000;

var app = express();
require('./config/passport')(passport);
var db = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var htmlRoutes = require("./controllers/html-routes");
var customerRoutes = require("./controllers/customers-api-routes");
var sitterRoutes = require("./controllers/sitters-api-routes");
var registrationRoutes = require("./controllers/sitters-api-routes");

app.use(htmlRoutes);
app.use(customerRoutes);
app.use(sitterRoutes);
app.use(registrationRoutes);

db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
