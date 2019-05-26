var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');


var router = function(nav){
        authRouter.route('/signUp')
        .post(function(req, res){
            console.log(req.body);
            
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db){
                if (err) throw err;
                var collection = db.collection('users');
                //create a user object
                var user = {
                    username: req.body.userName,
                    password: req.body.password
                };
                collection.insert(user, function(err, results){
                   req.login(results.ops[0], function() {
                     res.redirect('/auth/profile');
                   });
                });
                
            });
            
            /*req.login(req.body, function(){
                res.redirect('/auth/profile');
            });*/
            // res.send('Signed up');
        });
        
        authRouter.route('/signIn')
            .post(passport.authenticate('local', {
                failureRedirect: '/'
            }), function(req, res){
                res.redirect('/auth/profile');
            });
            
        authRouter.route('/profile')
        .all(function(req, res, next){
            //route user when not loged in
            if (!req.user){
                res.redirect('/');
            }
            next();
        })
        .get(function(req, res){
           res.json(req.user);
        });
    return authRouter;
}

module.exports = router;