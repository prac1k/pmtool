const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Users = new Schema({
    full_name: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String
    },
    password: {
        type: String,
        required: true
        },
    date: {
     type: Date,
     default: Date.now
    },

},
    {
    collection: 'users'
});

module.exports = mongoose.model('Users', Users);
