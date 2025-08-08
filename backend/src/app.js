const express=require("express");
const aiRoute = require('./routes/aiRoutes.js');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use('/ai',aiRoute);

module.exports = app;