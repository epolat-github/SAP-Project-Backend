const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create "vagonlar" schema
const vagonSchema = new Schema({
    Tip: String,
    MaksimumYük: Number,
    YükBirimi: {
        type: String,
        enum: ["ton", "kilo", "adet"],
    },
});

module.exports = vagonlarModel = mongoose.model(
    "vagontipleri",
    vagonSchema,
    "vagontipleri"
);
