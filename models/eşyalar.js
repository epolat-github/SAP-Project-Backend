const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create "Eşyalar" schema
const EşyaSchema = new Schema({
    id: Number,
    Birim: {
        type: String,
        enum: ["ton", "kilo", "adet"],
    },
    İçerik: String,
});

module.exports = eşyalarModel = mongoose.model("eşyalar", EşyaSchema, "eşyalar");
