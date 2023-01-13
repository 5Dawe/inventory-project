const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema(
    {
    make: { type: String, required: [true, 'A make is required']},
    model: { type: String, required: [true, 'A model is required']},
    asset: { type: Number},
    serial: { type: String},
    description: { type: String},
    location: { type: String},
    building: {type: String},
    status: { type: String},
    },
    { timestamps: true }

);

module.exports = mongoose.model("Item", itemSchema);
