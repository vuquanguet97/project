const app          = require('express')(),
	  bodyParser   = require('body-parser'),
	  cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
