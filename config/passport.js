var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");


  passport.use(new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: "username"
    },
    function(username, password, done) {
      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          username: username
        }
      }).then(function(dbUser) {
        // If there's no user with the given username
        if (!dbUser) {
          console.log("wrong Username");
          return done(null, false, {
            message: "Incorrect username."
          });
        }
        // If there is a user with the given username, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          console.log("wrong password");
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  ));
  
  // User.findOne({ where: { username: req.body.username } }) // searching a user with the same username and password sended in req.body
  //   .then(function (user) {
  //     if(user && user.validPassword(req.body.password)) {
  //        return res.status(200).json({message: "login successful"});
  //     } else {
  //        return res.status(401).json({message: "Unauthorized"});
  //     }

  //   }).catch(function (err) {
  //     return res.status(200).json({ message: "server issues when trying to login!" }); // server problems
  //   });



  // In order to help keep authentication state across HTTP requests,
  // Sequelize needs to serialize and deserialize the user
  // Just consider this part boilerplate needed to make it all work
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });


//   passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });
   
//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function (err, user) {
//       done(err, user);
//     });
//   });
  // Exporting our configured passport
  module.exports = passport;