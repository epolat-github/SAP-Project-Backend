const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create "Talepler" schema
const RequestSchema = new Schema({
    TalepNo: {
        type: Number,
        index: true,
        unique: true,
        // required: true,
    },
    Şirketİsmi: {
        type: String,
        required: true,
    },
    TalepDurumu: {
        type: String,
        required: true,
    },
    TalepTürü: {
        type: String,
        default: "Ticari Müşteri-1",
        required: true,
    },
    TeslimTarihi: {
        type: Date,
        required: true,
    },
    TaşımaTürü: {
        type: String,
        enum: ["Yurtdışı", "Yurtiçi"],
        required: true,
    },
    İstasyonlar: {
        Çıkış: {
            type: String,
            required: true,
        },
        Varış: {
            type: String,
            required: true,
        },
    },
    VagonBilgi: [
        {
            KalemNo: Number,
            VagonTipi: String,
            VagonSayısı: Number,
            KıymetAlma: Boolean,
            KrediliTaşıma: Boolean,
            CariHesap: Boolean,
            Eşyalar: [
                {
                    Eşyaİsmi: String,
                    EşyaMiktarı: Number,
                    EşyaBirimi: {
                        type: String,
                        enum: ["ton", "kilo", "adet"],
                    },
                },
            ],
            ToplamYük: Number,
            YükBirimi: {
                type: String,
                enum: ["ton", "kilo", "adet"],
            },
        },
    ],
});

// static functions
RequestSchema.statics.findMaxTalepNo = async function () {
    const found = await this.find({}).sort({ TalepNo: -1 }).limit(1);

    const biggestTalepNo = found[0].toObject().TalepNo;
    return parseInt(biggestTalepNo, 10);
};

/* MIDDLEWARES */
// Pre Hook for "TalepNo"
RequestSchema.pre("save", async function (next) {
    const doc = this;

    //find the biggest
    const biggestTalepNo = await requestsModel.findMaxTalepNo();

    doc.TalepNo = biggestTalepNo + 1;

    next();
});

module.exports = requestsModel = mongoose.model(
    "talepler",
    RequestSchema,
    "talepler"
);
