var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var cookieParser = require('cookie-parser');

// db modules
var db = require("./models");

// Routes
// =============================================================
var htmlRoutes = require("./controllers/html-routes");
var customerRoutes = require("./controllers/customers-api-routes");
var sitterRoutes = require("./controllers/sitters-api-routes");
var registrationRoutes = require("./controllers/sitters-api-routes");

var PORT = process.env.PORT || 3000;
// =============================================================
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(htmlRoutes);
app.use(customerRoutes);
app.use(sitterRoutes);
app.use(registrationRoutes);

// Authentication set up with Passport & Express-ssession
//==============================================================
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true
},
  function(username, password, done) {
    db.customers.findOne({ username: username }, function (err, customer) {
      if (err) { return done(err); }
      if (!customer) { return done(null, false); }
      if (!customer.verifyPassword(password)) { return done(null, false); }
      return done(null, customer);
    });
  }
));

passport.serializeUser(function(customer, done) {
  done(null, customer.id);
});
 
passport.deserializeUser(function(id, done) {
  db.customers.findById({where: {id: id}}, function (err, customer) {
      //%%%%//customer or customer.id
    done(err, customer);
  });
});

//Set up for passport-local-sequelize
//==============================================================
// passport.use(db.createStrategy());
 
// passport.serializeUser(db.serializeUser());
// passport.deserializeUser(db.deserializeUser());

// Starts the server to begin listening
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });


  //==============================================================