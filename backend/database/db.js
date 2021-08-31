var mongoose = require('mongoose');

var url = process.env.DB_URL;

function dbconnect() {
    mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
        .then(db => {
            console.log('Successfully connected to database!');
        })
        .catch(err => {
            console.log('Error during connecting the database!');
        })
}

module.exports = dbconnect;