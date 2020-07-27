const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
var createError = require("http-errors");

const app = express();

/* MODEL IMPORTS */
const requestsModel = require("./models/talepler");
const eşyalarModel = require("./models/eşyalar");
const istasyonlarModel = require("./models/istasyonlar");
const müşterilerModel = require("./models/müşteriler");
const vagonlarModel = require("./models/vagonlar");

/* MIDDLEWARES */
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* INIT DB */
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log("DB connected"))
    .catch((err) => console.error("DB connection error: ", err));

/* FORM VALIDATION SCHEMAS */
const talepSchema = require("./validationSchemas/talepSchema");

/* ROUTES */
app.get("/", (req, res) => {
    res.send("root");
});

app.get("/talep", async (req, res, next) => {
    try {
        const requests = await requestsModel.find({}).select({ _id: 0 });
        res.json(requests);
    } catch (err) {
        next(err);
    }
});

app.post("/talep", async (req, res, next) => {
    try {
        const { error } = talepSchema.validate(req.body);
        if (error) {
            throw createError(400, error);
        }

        const yeniTalep = new requestsModel(req.body);

        await yeniTalep.save();

        res.send(`Talep No ${yeniTalep.toObject().TalepNo} kaydedildi.`);
    } catch (err) {
        next(err);
    }
});

app.get("/genelVeri", async (req, res, next) => {
    try {
        Promise.all([
            eşyalarModel.find({}).select({ _id: 0 }),
            istasyonlarModel.find({}).select({ _id: 0 }),
            müşterilerModel.find({}).select({ _id: 0 }),
            vagonlarModel.find({}).select({ _id: 0 }),
        ]).then(([eşyalar, istasyonlar, müşteriler, vagonlar]) => {
            console.log(istasyonlar);
            const yurtiçiİstasyonlar = istasyonlar[0].toObject()["Yurtiçi"];
            const yurtdışıİstasyonlar = istasyonlar[1].toObject()["Yurtdışı"];
            res.json({
                eşyalar,
                istasyonlar: {
                    yurtiçi: yurtiçiİstasyonlar,
                    yurtdışı: yurtdışıİstasyonlar,
                },
                müşteriler,
                vagonlar,
            });
        });
    } catch (err) {
        next(err);
    }
});

app.get("/talep/:talepNo", async (req, res, next) => {
    try {
        const TalepNo = req.params.talepNo;
        const requests = await requestsModel
            .findOne({ TalepNo })
            .select({ _id: 0 });
        if (!requests) throw createError(404, "Talep bulunamadı.");
        res.json(requests);
    } catch (err) {
        next(err);
    }
});

/* ERROR HANDLER */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message });
});

/* 404 HANDLER */
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

/* SERVER RUNNER */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
