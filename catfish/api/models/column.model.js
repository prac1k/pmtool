const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ColumnSchema = new Schema({

    column_title: {
        type: String
    },
    column_board: {
        type: Schema.Types.ObjectId,
        ref: 'boards'
    },
    column_position: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Column = mongoose.model('columns', ColumnSchema);

module.exports = Column;
