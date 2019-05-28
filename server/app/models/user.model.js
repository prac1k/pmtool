const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    website: String,
    companyname: String

}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema)
