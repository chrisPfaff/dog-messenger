const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();
const Nexmo = require("nexmo");
const app = express();
const path = require("path");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const getRandomDogImage = phone => {
  axios
    .get("https://dog.ceo/api/breed/corgi/images/random")
    .then(data => {
      return data;
    })
    .then(img => {
      sendMessage(phone, img.data.message);
    });
};

const sendMessage = (phone, url) => {
  const nexmo = new Nexmo({
    apiKey: `${process.env.API_KEY}`,
    apiSecret: `${process.env.SECRET}`
  });
  const from = "16262911112";
  const to = `1${phone.replace(/-/g, "")}`;
  const text = `your dog message ${url}`;

  nexmo.message.sendSms(from, to, text);
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/action", async (req, res) => {
  getRandomDogImage(req.body.phone);
  res.redirect("/");
});

app.listen(port, () => {
  console.log("app is listening");
});
