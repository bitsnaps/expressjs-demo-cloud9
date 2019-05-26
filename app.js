//require express framework
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');


//MySQL configuration
var sql      = require('mysql');
var config = {
  host     : 'localhost',
  user     : 'bitsnaps',
  password : '',
  database : 'books'
};
var connection = sql.createConnection(config);
/*//MySQL usage example
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});
*/



//init your app to keep your dependecies using: npm init

//install express by command line (--save means input that in package.json):
//npm install express --save

var app = express();

var port = process.env.PORT || 5000;

//navigation bar
var nav = [{
                Link: '/Books',
                Text: 'Book'
            }, {
                Link: '/Authors',
                Text: 'Author'
            }];
            
var bookRouter = require('./src/routes/bookRoutes')(nav, connection);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

//set static directories (middleware)
app.use(express.static('public'));
// app.use(express.static('src/views'));
app.set('views', 'src/views');

//parsing body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(cookieParser());
app.use(session({secret: 'library'}));
/*//external file /src/passport.js
app.use(passport.initialize());
app.use(passport.session());*/
require('./src/config/passport')(app);

//using Jade (install first: npm install --save jade)
// app.set('view engine', 'jade');

//using express-handlebars
// var handlebars = require('express-handlebars');
// app.engine('.hbs', handlebars({extname: '.hbs'}));
// app.set('view engine', '.hbs');//for handlebars
app.set('view engine', 'ejs');//for ejs

            
//tell the app to use our Routers
app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res){
    // res.send('hello world');
    
    //after installing jade and create views/index.jade:
    // res.render('index');
    
    //passing JSON object
    res.render('index', {title: 'Hello from render', /*fruits: ['orange', 'apple', 'banana'],*/
        nav:[{Link:'/Books', Text: 'Books'}, {Link:'/Authors', Text:'Authors'}]
    });
});

app.get('/books', function(req, res){
    res.send('Hello Books');
});

app.listen(port, function(err){
    if (!err){
        console.log('running server on port: http://' + process.env.IP+':'+process.env.PORT);
    }
});

//then we install bower globally
//npm install bower -g

//we've created .bowerrc and we've set lib directory as default resources folder
//then we've installed bootstrap & font-awesome:
//bower install --save bootstrap
//bower install --save font-awesome

//install gulp task management (js build tool)
//npm install -g gulp
//npm install gulp --save-dev
//npm install --save gulp-jshint gulp-jscs jshint-stylish

//now if you run: "gulp style" you should see some hints about your js code

//then we install:
//npm install wiredep --save-dev

//then we comment out js <script> from our index.html and we call:
//gulp inject

//we've added overrides to bower.js in order to select the files we want (*.min.js or *.js...)

//now we install gulp-inject:
//npm install gulp-inject --save-dev

//then we install:
//npm install --save-dev gulp-nodemon
//we've create serve task in gulpfile.js for monitoring, then we execute:
//gulp serve

//Templating engines:
//jade: runs through compiler, whitespace tabs based. npm install --save jade
//handlebars: minimalist engine, html based, operates as javascript. npm install --save express-handlebars
//ejs: html based, use <%=%> syntax, npm install --save ejs

//install mongodb
//npm install mongodb --save

//install body-parser to parse forms
//npm install --save body-parser

//install cookie-parser passport express-session
//npm install --save cookie-parser passport express-session

//install passport-local
//npm install --save passport-local

//don't forget to launch MongoDB server with --smallfiles option in this server
//mongod --smallfiles