const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const layouts = require("express-ejs-layouts");


//connect to mongoDB server
const mongodb_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pwdemo';
console.log('MONGODB_URI=',process.env.MONGODB_URI);

const mongoose = require( 'mongoose' );

mongoose.connect( mongodb_URI);

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!!!")
});

//enable sessions
const session = require("express-session"); // to handle sessions using cookies 
var MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
  uri: mongodb_URI,
  collection: 'mySessions'
});

// Catch errors                                                                      
store.on('error', function(error) {
  console.log(error);
});

//create app
var app = express();

app.use(session({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week                                        
  },
  store: store,
  // Boilerplate options, see:                                                       
  // * https://www.npmjs.com/package/express-session#resave                          
  // * https://www.npmjs.com/package/express-session#saveuninitialized               
  resave: true,
  saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))