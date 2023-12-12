process.env.NODE_ENV = (process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() === 'production') ? 'production' : 'development';
const createError = require('http-errors');
const express = require('express');
const glob = require('glob');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.use(cookieParser());

//view setup
app.set('views',path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');
app.set('layout','layout');
app.use(expressLayouts);
app.set('layout');

app.use(logger('dev'));
app.use(express.json({limit : '500mb'}));
app.use(express.urlencoded({limit:'500mb',extended:false}));
app.use(express.static(path.join(__dirname,'public')));

// CORS setup
const cors = require('cors')
app.use(cors);

//session & database
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

//아직 config 생성 X
let options = {
  host : process.env.NODE_ENV==='production' ? config.DATABASE_INFO.pro.HOST:config.DATABASE_INFO.dev.HOST,
  port : process.env.NODE_ENV==='production' ? config.DATABASE_INFO.pro.PORT:config.DATABASE_INFO.dev.PORT,
  user : process.env.NODE_ENV==='production' ? config.DATABASE_INFO.pro.USER:config.DATABASE_INFO.dev.USER,
  password : process.env.NODE_ENV==='production' ? config.DATABASE_INFO.pro.PASSWORD:config.DATABASE_INFO.dev.PASSWORD,
  database : process.env.NODE_ENV==='production' ? config.DATABASE_INFO.pro.DATABASE:config.DATABASE_INFO.dev.DATABASE,
  expiration : 86400000, // 밀리초 => 24시간
}

let sessionStore = new MySQLStore(options)

app.use(session({
  key : 'S_DATA',
  secret : `FFAFDSA#$$$ghewirEhdgoanfrhk@!`,
  store:sessionStore,
  resave : false,
  saveUninitialized : false,
}))

app.use(async function(req, res, next){
  if(typeof req.session.authority !== 'undefined'){
    res.locals.isLogin = (req.session.authority > 0);
    res.locals.userInfo = req.session.userInfo;
    res.locals.auth = req.session.authority;
  } else {
    res.locals.isLogin = false;
    res.locals.userInfo = {};
  }
  res.locals.url = req.url;
  next();
})