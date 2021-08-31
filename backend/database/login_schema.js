let mongoose = require('mongoose');

let loginschema = mongoose.Schema({
    username: String,
    pwd: String,
    j_type: String
});

module.exports = mongoose.model('users', loginschema);