const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    address_street: String,
    phone: String,
    website: String,
    companyname: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema)
