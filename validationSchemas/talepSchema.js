const Joi = require("@hapi/joi");

const talepSchema = Joi.object({
    // TalepNo: Joi.number().required(),
    Şirketİsmi: Joi.string().required(),
    TalepDurumu: Joi.string().required(),
    TalepTürü: Joi.string().required(),
    TeslimTarihi: Joi.date().required(),
    TaşımaTürü: Joi.string().valid("Yurtdışı", "Yurtiçi").required(),
    İstasyonlar: Joi.object()
        .keys({
            Çıkış: Joi.string().required(),
            Varış: Joi.string().required(),
        })
        .required(),
    VagonBilgi: Joi.array().items(
        Joi.object().keys({
            KalemNo: Joi.number().required(),
            VagonTipi: Joi.string().required(),
            VagonSayısı: Joi.number().required(),
            KıymetAlma: Joi.boolean().required(),
            KrediliTaşıma: Joi.boolean().required(),
            CariHesap: Joi.boolean().required(),
            Eşyalar: Joi.array()
                .items(
                    Joi.object().keys({
                        Eşyaİsmi: Joi.string().required(),
                        EşyaMiktarı: Joi.number().required(),
                        EşyaBirimi: Joi.string()
                            .valid("ton", "kilo")
                            .required(),
                    })
                )
                .required(),
            ToplamYük: Joi.number().required(),
            YükBirimi: Joi.string().valid("ton", "kilo").required(),
        })
    ),
});

module.exports = talepSchema;
