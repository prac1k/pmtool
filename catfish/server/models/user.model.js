const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;
const Card = require("./card.model");
const Board = require("./board.model");
bcrypt = require('bcrypt');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    boards: [{type: Types.ObjectId, ref: "Board", default: []}],

    cards: [{type: Types.ObjectId, ref: "Card", default: []}],

    role: {
        type: String,
        required: true
    },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
