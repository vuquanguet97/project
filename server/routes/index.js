require('dotenv').config();
const express      = require('express'),
	  app          = express(),
	  bodyParser   = require('body-parser'),
	  cookieParser = require('cookie-parser'),
	  path         = require('path');

const staticPath = __dirname.substring(0, __dirname.substring(0, __dirname.lastIndexOf(path.sep)).lastIndexOf(path.sep));

app.use(express.static(`${staticPath}${path.sep}build`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/user', (req, res, next) => {
// 	if (!req.cookies.token) {
// 		return res.status(401).json({error: 'error'})
// 	}
// 	next();
// });

app.use('/auth', require('./auth'));
app.use('/group', require('./group'));
app.use('/user', require('./user'));
app.use('/message', require('./message'));

module.exports = app;
