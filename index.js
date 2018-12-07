const express = require("express");
const bodyParser = require("body-parser");
//const MessagingResponse = require("twilio").twiml.MessagingResponse;
require("dotenv").config();
const client = require("twilio")(process.env.accountSid, process.env.authToken);
//const twilio = require("twilio");
const app = express();
const path = require("path");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/action", (req, res) => {
  client.messages
    .create({
      body: "Hello from Node",
      to: "+#", // Text this number
      from: "+#" // From a valid Twilio number
    })
    .then(message => console.log(message.sid));
  res.redirect("/");
});

app.listen(port, () => {
  console.log("app is listening");
});
