var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var moment= require("moment");

// db modules
var db = require("./models");



var PORT = process.env.PORT || 3000;

var app = express();
require('./config/passport')(passport);
var db = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

//app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// // Global variables
// app.use(function(req, res, next){
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   res.locals.error = req.flash('error');
//   res.locals.user = req.user || null;
//   next();
// });

// passport.use(new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password',
//   session: true
// },
//   function(username, password, done) {
//     db.customers.findOne({ username: username }).then(function (customer) {
//       if (!customer) { return done(null, false); }
//       //if (!customer.verifyPassword(password)) { return done(null, false); }
//       return done(customer);
//     });
//   }
// ));

// passport.serializeUser(function(customer, done) {
//   //console.log(customer);
//   done(null, customer);
// });
 
// passport.deserializeUser(function(user, done) {
//   // done(null, user)
//   //console.log(user);
//   db.customers.findOne({where: {id: user.id}}).then(function (customer) {
//       //%%%%//customer or customer.id
//       //console.log(customer);

//     done(null, customer);
//   });
// });

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


//Set up for passport-local-sequelize
//==============================================================
// passport.use(db.createStrategy());
 
// passport.serializeUser(db.serializeUser());
// passport.deserializeUser(db.deserializeUser());

// Starts the server to begin listening
// =============================================================
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
