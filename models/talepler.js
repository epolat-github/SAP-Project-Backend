const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create "Talepler" schema
const RequestSchema = new Schema({
    TalepNo: {
        type: Number,
        index: true,
        unique: true,
    },
    Şirketİsmi: String,
    TalepDurumu: String,
    TalepTürü: {
        type: String,
        default: "Ticari Müşteri-1",
    },
    TeslimTarihi: Date,
    TaşımaTürü: {
        type: String,
        enum: ["Yurtdışı", "Yurtiçi"],
    },
    İstasyonlar: {
        Çıkış: String,
        Varış: String,
    },
    VagonBilgi: [
        {
            KalemNo: Number,
            VagonTipi: String,
            VagonSayısı: Number,
            Eşyalar: [String],
            ToplamYük: Number,
            YükBirimi: {
                type: String,
                enum: ["ton", "kilo", "adet"],
            },
        },
    ],
});

module.exports = requestsModel = mongoose.model(
    "talepler",
    RequestSchema,
    "talepler"
);
