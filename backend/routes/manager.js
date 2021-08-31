const router = require('express').Router();
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const empschema = require('../database/emp_schema');


router.get('/', (req, res) => {
    let query = {
        mngr_email: req.query.username,
        status: 'Pending'
    };
    empschema.find(query)
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            console.log(err);
        })
});

router.post('/', jsonParser, (req, res) => {

    //new:true is to return the updated doc;
    empschema.findOneAndUpdate({ _id: req.body.id }, { status: req.body.status }, { new: true })
        .then(doc => {
            res.json("Success");
        })
        .catch(err => {
            res.json("Error");
        })

});


module.exports = router;