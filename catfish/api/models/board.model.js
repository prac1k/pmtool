const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BoardSchema = new Schema({

    board_title: {
        type: String
    },
    board_description: {
        type: String
    },
    board_responsible: {
        type: Array
    },
    board_completed: {
        type: Boolean
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Board = mongoose.model('boards', BoardSchema);

module.exports = Board;
