require("dotenv").config();
const express = require('express');
const cors = require('cors');
const connectDB = require("./src/db/db");
const router = require("./src/routes/_index.routes");


const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());

//Connect MongoDB
connectDB()

app.get("/test", (req, res) => {
  res.json({ msg: "BOC : Test ok!" });
});

app.use("/", router);

// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});