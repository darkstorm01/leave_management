const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

var jsonParser = bodyParser.json();
//importing userschema
let user = require('../database/login_schema');

router.post('/', jsonParser, (req, res) => {
    let response = {
        username: req.body.username,
        pwd: req.body.pwd,
        j_type: req.body.j_type
    };
    user.find(response)
        .then(doc => {
            if (doc.length == 1) {
                res.json(doc);
            }
            else
                res.json('Error')
        })
        .catch(err => {
            console.log(err);
        })
});


module.exports = router;