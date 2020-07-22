const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create "istasyonlar" schema
const İstasyonSchema = new Schema({
    Yurtiçi: [String],
    Yurtdışı: [String],
});

module.exports = istasyonlarModel = mongoose.model(
    "istasyonlar",
    İstasyonSchema,
    "istasyonlar"
);
