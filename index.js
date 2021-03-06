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

const sendMessage = async phone => {
  const nexmo = new Nexmo({
    apiKey: `${process.env.API_KEY}`,
    apiSecret: `${process.env.SECRET}`
  });
  const from = "16262911112";
  const to = `1${phone.replace(/-/g, "")}`;
  const text = await axios
    .get("https://dog.ceo/api/breed/corgi/images/random")
    .then(data => {
      return data;
    })
    .then(img => {
      return img.data.message;
    });

  nexmo.message.sendSms(from, to, `Here's your dog image ${text}`);
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/action", async (req, res) => {
  sendMessage(req.body.phone);
  res.redirect("/");
});

app.listen(process.env.PORT || port, () => {
  console.log("app is listening");
});
