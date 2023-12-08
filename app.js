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
app.set('views',path.join(__dirname, 'views'))
app.engine('html',require('ejs').renderFile)