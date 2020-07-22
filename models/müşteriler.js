const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create "müşteriler" schema
const müşteriSchema = new Schema({
    id: Number,
    İsim: String,
});

module.exports = müşterilerModel = mongoose.model(
    "müşteriler",
    müşteriSchema,
    "müşteriler"
);
