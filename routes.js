module.exports = function(app){
    var application = require('./routes/application');
    var users = require('./routes/users');
    
    app.use('/', application);
    app.use('/login', users);
    // app.use('/users', users);
    //app.use('/searchproperties', searchproperties);
}