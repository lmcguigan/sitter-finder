var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var passport = require('passport');
var session = require('express-session');
<<<<<<< HEAD
var cookieParser = require('cookie-parser');
var moment= require("moment");

// db modules
var db = require("./models");



=======
var moment = require("moment");
var models = require("./models");
// db modules
var db = require("./models");

>>>>>>> 638aa8386c13c4583b9122cdb4bd951e661b6294
var PORT = process.env.PORT || 3000;

var app = express();


app.use(express.static("public"));


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// For Passport
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessionsa


app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");


// Routes
// =============================================================
var htmlRoutes = require("./controllers/html-routes");
var customerRoutes = require("./controllers/customers-api-routes");
var sitterRoutes = require("./controllers/sitters-api-routes");
var registrationRoutes = require("./controllers/sitters-api-routes");

//load passport strategies
require('./config/passport.js')(passport, models.customers);

app.use(htmlRoutes);
app.use(customerRoutes);
app.use(sitterRoutes);
app.use(registrationRoutes);

<<<<<<< HEAD

//Set up for passport-local-sequelize
//==============================================================
// passport.use(db.createStrategy());
 
// passport.serializeUser(db.serializeUser());
// passport.deserializeUser(db.deserializeUser());

// Starts the server to begin listening
// =============================================================
db.sequelize.sync({ force: false}).then(function () {
  app.listen(process.env.PORT || 3000, function () {
    console.log("hi");
=======
db.sequelize.sync({
  force: false
}).then(function () {
  app.listen(process.env.PORT || 3000, function () {
>>>>>>> 638aa8386c13c4583b9122cdb4bd951e661b6294
    console.log("App listening on PORT " + PORT);
  });
});