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
const session =require('express-session')