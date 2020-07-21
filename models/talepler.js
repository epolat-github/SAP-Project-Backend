const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create "Talepler" schema
const RequestSchema = new Schema({
    TalepNo: Number,
    Şirketİsmi: String,
    TalepDurumu: String,
    TalepTürü: {
        type: String,
        default: "Ticari Müşteri-1",
    },
    teslimTarihi: Date,
    TaşımaTürü: String,
});

module.exports = requestsModel = mongoose.model("talepler", RequestSchema, "talepler");
