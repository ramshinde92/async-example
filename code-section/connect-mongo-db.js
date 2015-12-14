var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/async-db');

module.exports = mongoose.connection;
