const express = require("express");
const path = require("path");
const { name } = require("pug/lib");
const app = express();
const fs = require("fs");
const port = 8000;
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/contactUs");
}

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  gender: String,
  address: String,
});
const Contact = mongoose.model("Contact", contactSchema);

app.use("/static", express.static("static"));
app.use(express.urlencoded());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home.pug", params);
});
app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});
app.post("/contact", (req, res) => {
  var myData = new Contact(req.body);
  myData
    .save()
    .then(() => {
      res.send("This item has been saved to the database");
    })
    .catch(() => {
      res.status(400).send("Item was not saved to the database");
    });
  // res.status(200).render("contact.pug");
});

// app.post("/contact", (req, res) => {
//   mane = req.body.name;
//   email = req.body.email;
//   phone = req.body.phone;
//   gender = req.body.gender;
//   address = req.body.address;

//   let outputToWrite = `The name of the client is ${mane}. His/Her email-is is ${email}. His/Her conatct no. is ${phone}. His/Her Gender is ${gender}. He/She has given a message "${address}".`;
//   fs.writeFileSync("output.txt", outputToWrite);
// });
app.listen(port, () => {
  console.log(`Your application started successfully on port ${port}`);
});
