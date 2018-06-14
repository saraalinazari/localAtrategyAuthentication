
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parse');
const bodyparser  = require('body-parser');
const passport = require("passport");
var debug = require('debug')('express-example');
const db = require('./models');

const app = express();

// we set the port of the app
app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(logger('dev'));






app.use(express.static(path.join(__dirname, 'public')));
// app.use(require('serve-static')(__dirname + '/../../public'));///../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


var isAuth 				 = require("./config/middleware/isAuthenticated");
var authCheck 		 = require('./config/middleware/attachAuthenticationStatus');


require('./routes')(app);
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  // no stacktraces leaked to user unless in development environment
  app.use(function(err, req, res, next) {
    if(err){
      throw err;
    }
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: (app.get('env') === 'development') ? err : {}
    })
  });
  
  
  // our module get's exported as app.require('./routes')(app);

 

// we sync the models with our db 
// (thus creating the apropos tables)
db.sequelize.sync().then(function () {
	// set our app to listen to the port we set above
  var server = app.listen(app.get('port'), function() {
  	// then save a log of the listening to our debugger.
    debug('Express server listening on port ' + server.address().port);
  });
}); 
module.exports = app;
