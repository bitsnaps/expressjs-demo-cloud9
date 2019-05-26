var express = require('express');
var mongodb = require('mongodb').MongoClient;
var bookRouter = express.Router();
var ObjectId = require('mongodb').ObjectID;


//connection param now should be removed!
var router = function(nav, connection){
    var bookController = require('../controllers/bookController')(null, nav);
    
    bookRouter.use(bookController.middleware /*function(req, res, next){
    //we took this code to a separate bookController.js
        if (!req.user){
                res.redirect('/');
            }
        next();
    }*/);
    
    // connection.connect();
    bookRouter.route('/')
        //moved to bookController.js
        .get(bookController.getIndex /*function(req, res){
            //MS SQL Server
            // var request = new sql.Request();
            //MySQL
            //connection.query('SELECT * FROM books', function(err, rows, fields) {
              //if (err) throw err;
             
                //res.render('bookListView',{
                  //title: 'Books',
                  //nav: nav,
                  //books: rows
                //});
            
            //});
            //res.render('bookListView', {title: 'Hello from render',
            //nav:nav,
            //books: books
            //});
        
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db){
                var collection = db.collection('books');
                collection.find({}).toArray(function (err, results){
                    //if (err) throw err;
                    res.render('bookListView', {
                        title: 'Books',
                        nav: nav,
                        books: results
                    });
                });
            });
            
    }*/);
    
    bookRouter.route('/:id')
        // deal with all verbs (post, get, put, delete)
        /*.all(function (req, res, next){
        //moved to get() function at the bottom
            var id = new ObjectId(req.params.id);
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db){
                var collection = db.collection('books');
                collection.findOne({_id:id},
                function (err, results){
                    if (err) throw err;
                    res.render('bookView', {
                        title: 'Books',
                        nav: nav,
                        book: results
                    });
                });
            });
            
            //connection.query('SELECT * FROM books WHERE id=?', [req.params.id], function(err, rows, fields) {
              //if (err) throw err;
                //if (rows.length === 0) {
                    //res.status(404).send('Not Found');
                //} else {
                    //req.book = rows[0];
                    //next();
                //}
            //});
        })*/
        //moved to bookController.js
        .get(bookController.getById/*function(req, res){
            var id = new ObjectId(req.params.id);
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db){
                var collection = db.collection('books');
                collection.findOne({_id:id},
                function (err, results){
                    if (err) throw err;
                    res.render('bookView', {
                        title: 'Books',
                        nav: nav,
                        book: results
                    });
                });
                
            //res.render('bookView', {
                //title: 'Books',
                //nav: nav,
                //book: req.book
            //});
            //res.send('Hello Single Book');
            
        });
    }*/);
    // connection.end();
    return bookRouter;
}

module.exports = router;