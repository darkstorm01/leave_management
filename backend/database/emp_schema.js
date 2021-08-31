let mongoose = require('mongoose');

let empschema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    from: Date,
    to: Date,
    mngr_email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    }
});

module.exports = mongoose.model('employees', empschema);