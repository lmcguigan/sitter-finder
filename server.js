var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var passport = require('passport');
var session = require('express-session');
<<<<<<< HEAD
var flash = require('connect-flash');
=======
<<<<<<< HEAD
var flash = require('connect-flash');
=======
>>>>>>> e14a93305cbb6db9974d3d294187f19128d283cc
var cookieParser = require('cookie-parser');
var moment= require("moment");

// db modules
var db = require("./models");
<<<<<<< HEAD
=======


>>>>>>> 9337f3f25096dfeba378185f3e5609b3678974e3

>>>>>>> e14a93305cbb6db9974d3d294187f19128d283cc
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

//Set up for passport-local-sequelize
//==============================================================
// passport.use(db.createStrategy());
 
// passport.serializeUser(db.serializeUser());
// passport.deserializeUser(db.deserializeUser());

// Starts the server to begin listening
// =============================================================
<<<<<<< HEAD
db.sequelize.sync({ force: false}).then(function () {
  app.listen(PORT, function () {
=======
db.sequelize.sync({ force: false }).then(function () {
  app.listen(process.env.PORT || 3000, function () {
    console.log("hi");
>>>>>>> 9337f3f25096dfeba378185f3e5609b3678974e3
    console.log("App listening on PORT " + PORT);
  });
});
