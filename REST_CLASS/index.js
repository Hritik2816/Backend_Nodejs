const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")))


let posts = [
  {
    username: "hritik2816",
    content: "This is the file of Hritik Gupta "
  },
  {
    username: "bhawna28",
    content: "This is the file of Bhawna Gupta "
  },
  {
    username: "hrk16",
    content: "This is the file of Hritik Kumar "
  },
]

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
})
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
})

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  posts.push({ username, content });
  res.redirect("/posts");

})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})