const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Users = new Schema({
    full_name: {
        type: String
    },
    role: {
        type: String
    },
    phone_number: {
    type: String,
    required: true
    }
},
    {
    collection: 'users'
});

module.exports = mongoose.model('Users', Users);
