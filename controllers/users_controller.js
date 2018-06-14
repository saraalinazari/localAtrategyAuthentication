var db = require('../models');
const passport = require('../config/passport');
exports.index = function(req, res) {
    console.log("inside users controller index");
    // res.render('index');
    res.render('users/login', {
        layout: 'main-login'
      });
  
};
exports.loginUser = function(req,res){
    console.log("inside users controller loginUser");
    console.log(res);
    console.log(req);
    // passport.authenticate('local', { failureRedirect: '/login' }),
    //     function(req, res) {
            // res.redirect('/');//}
            res.redirect('/' + req.user.username);
}
exports.registerUser = function(req,res){
    console.log("inside users controller registerUser");
    res.render('users/register', {
        layout: 'main-login'
      });
}

exports.signUpUser = function(req,res) {
    console.log("inside users controller signUpUser");
    db.User.findAll({
      where: {username: req.body.username}
    }).then(function(users) {
      if (users.length > 0) {
        console.log("inside if in signUpUser")
        res.json({
          duplicateUser: true
        });
      //At some point, make sure that only one user can be associated with an email.
      } else {
        console.log("in else in signUpUser");
        console.log(req.body);
        db.User.create({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          address: req.body.address,
          phonenumber: req.body.phonenumber
          
        }).then(newUser => {
          console.log(`New user ${newUser.name}, with id ${newUser.id} has been created.`);
          // function(dbuser){
          // console.log("new user",dbuser.firstname);
          // newUser => {
          // console.log(`New user ${newUser.name}, with id ${newUser.id} has been created.`);
          res.send({redirect: '/'});
        // });
        // then(function(dbuser) {
        //   //res.send({redirect: '/'});
        //   console.log("you are in signUpUser");
        // //  res.send({redirect: '/'});
        // // res.render('index');
        //    //res.redirect("/");
        //   window.location.href='/';
        //   res.json(dbuser);
        }).catch(function(err) {
          console.log("error dare");
          res.json(err);
        });
      }
    })
  };
  
  