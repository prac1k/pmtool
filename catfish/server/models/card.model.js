const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = Schema.Types;
const User = require("./user.model")

const CardSchema = new Schema({
    title: Types.String,
    body: Types.String,
    assignedBy: Types.String,
    assignedTo: [{type: Types.ObjectId, ref: "User", default: []}],
})

module.exports = mongoose.model("Card", CardSchema, "cards")
