const express = require("express");
const app = express();
const path = require("path");

const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home.ejs");
})

app.get("/hello", (req, res) => {
  res.send("hello world");
})

app.get("/rolldie", (req, res) => {
  let num = Math.floor(Math.random() * 6) + 1
  res.render("rolldie.ejs", { num })
})

app.get("/ig/:username", (req, res) => {
  let { username } = req.params
  res.render("instagram.ejs", { username })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})