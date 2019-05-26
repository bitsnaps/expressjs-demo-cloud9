var passport = require('passport');

module.exports = function (app){
    
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done){
       done(null/*err*/, user/* or .email*/);
    });
    passport.deserializeUser(function (user, done){
        // mongodb.findOne({ search by id})
       done(null/*err*/, user/*.id or .email*/);
    });
    
    require('./strategies/local.strategy')();
    
};