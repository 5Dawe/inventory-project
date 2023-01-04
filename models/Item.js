const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema(
    {
    make: { type: String, required: [true, 'A make is required']},
    model: { type: String, required: [true, 'A model is required']}
    },
    { timestamps: true }

);

module.exports = mongoose.model("Item", itemSchema);
