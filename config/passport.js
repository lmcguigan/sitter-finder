
<<<<<<< HEAD
module.exports = function(passport) {
    
  
      passport.use('local-register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: true,
        //passReqToCallback : true
      },
        function(email, password, done) {
        console.log("Hit passport register")
          db.customers.findOne({ where: {email: email, password: password} }).then(function (err, customer) {
              console.log("Returned something");
              console.log(customer);
            if (err) { 
                console.log("Had an error! " + err);
                return done(err); }
            if (!customer) {
                //console.log("No customer")
                return done(null, false, req.flash('registerMessage', 'The email is already used')); 
            }
            if (!customer.verifyPassword(password)) { 
                //console.log("Bad password")
                return done(null, false); 
            }
            //console.log("Returning customer");
            return done(null, customer);
          });
=======
  //load bcrypt
  var bCrypt = require('bcrypt-nodejs');

  module.exports = function(passport,user){

  var User = user;
  var LocalStrategy = require('passport-local').Strategy;


  passport.serializeUser(function(user, done) {
          done(null, user.id);
      });


  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id).then(function(user) {
        if(user){
          done(null, user.get());
>>>>>>> 638aa8386c13c4583b9122cdb4bd951e661b6294
        }
        else{
          done(user.errors,null);
        }
      });

  });


  passport.use('local-signup', new LocalStrategy(

    {           
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done){
       
      console.log("Signing Up");

      var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

       User.findOne({where: {email:email}}).then(function(user){

      if(user)
      {
        return done(null, false, {message : 'That email is already taken'} );
      }

      else
      {
        var userPassword = generateHash(password);
        var data =
        { email:email,
        password:userPassword,
        name: req.body.name,
        zipcode:req.body.zipcode,
        phone:req.body.phone,
        address:req.body.address
        };


        User.create(data).then(function(newUser,created){
          if(!newUser){
            return done(null,false);
          }

          if(newUser){
            return done(null,newUser);
            
          }


        });
      }


    }); 



  }



  ));
    
  //LOCAL SIGNIN
  passport.use('local-signin', new LocalStrategy(
    
  {

  // by default, local strategy uses username and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
  },

  function(req, email, password, done) {

    var User = user;

    var isValidPassword = function(userpass,password){
      return bCrypt.compareSync(password, userpass);
    }

    User.findOne({ where : { email: email}}).then(function (user) {

      if (!user) {
        return done(null, false, { message: 'Email does not exist' });
      }

      if (!isValidPassword(user.password,password)) {

        return done(null, false, { message: 'Incorrect password.' });

      }

      var userinfo = user.get();

      return done(null,userinfo);

    }).catch(function(err){

      console.log("Error:",err);

      return done(null, false, { message: 'Something went wrong with your Signin' });


    });

  }
  ));

  }

