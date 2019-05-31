const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Users = new Schema({
    full_name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
        }
},
    {
    collection: 'users'
});

module.exports = mongoose.model('Users', Users);
