const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const PORT = 9000;

const app = express();

//connecting to database
const dbase = require('./database/db');
dbase();

app.use(cors());
//session and cookie-parser

app.use(cookieParser());

const user = require('./routes/user');
const manager = require('./routes/manager');
const employee = require('./routes/employee');

app.use('/user', user);
app.use('/m', manager);
app.use('/e', employee);

app.listen(PORT, function (req, res) {
    console.log(`App is listening at port: ${PORT}`);
});