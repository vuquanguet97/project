const app = require('express')();

app.use('/auth', require('./auth'));
app.use('/group', require('./group'));
app.use('/user', require('./user'));

module.exports = app;
