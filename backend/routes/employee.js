const router = require('express').Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

//employee leave schema 
const empschema = require('../database/emp_schema');

//login schema
const loginschema = require('../database/login_schema');

router.get('/', (req, res) => {
    let query = {
        username: req.query.username
    };
    empschema.find(query)
        .then((doc) => {
            res.json(doc);
        })
        .catch(err => {
            console.log(err);
        })
});

router.post('/', jsonParser, (req, res) => {
    let response = new empschema({
        username: req.body.username,
        reason: req.body.reason,
        from: req.body.from,
        to: req.body.to,
        mngr_email: req.body.mngr_email
    });
    response.save()
        .then(doc => {
            res.json("Success");
        })
        .catch(err => {
            res.json("Error");
        })
});

//to check whether manager exists

router.get('/check_manager', (req, res) => {
    let query = {
        username: req.query.username,
        j_type: "m"
    };
    loginschema.find(query)
        .then((doc) => {
            res.json(doc);
        })
        .catch(err => {
            console.log(err);
        })
});

module.exports = router;