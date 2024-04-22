const mongoose = require("mongoose");

async function connectDB() {
    const DB_URL = process.env.DB_URL;
    try {
        // console.log(DB_URL);
        await mongoose.connect(DB_URL);
        console.log("DB Connected");
    } catch (error) {
        console.log("DB_ERROR", error);
    }

    // mongoose
    //     .connect(DB_URL)
    //     .then(() => console.log("DB Connected!"))
    //     .catch((e) => console.log(e));
}

module.exports = connectDB;