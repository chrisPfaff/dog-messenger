const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const Nexmo = require("nexmo");
const app = express();
const path = require("path");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/action", (req, res) => {
  const nexmo = new Nexmo({
    apiKey: `${process.env.API_KEY}`,
    apiSecret: `${process.env.SECRET}`
  });
  const from = "15404694839";
  const to = "15612544959";
  const text = "https://images.dog.ceo/breeds/cairn/n02096177_13306.jpg";

  nexmo.message.sendSms(from, to, text);

  res.redirect("/");
});

app.listen(port, () => {
  console.log("app is listening");
});
