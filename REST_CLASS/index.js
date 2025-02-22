const express = require('express');
const methodOverride = require('method-override');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: "1a",
    username: "hritik2816",
    content: "This is the file of Hritik Gupta "
  },
  {
    id: "2a",
    username: "bhawna28",
    content: "This is the file of Bhawna Gupta "
  },
  {
    id: "3a",
    username: "hrk16",
    content: "This is the file of Hritik Kumar "
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find(p => p.id === id);
  if (post) {
    res.render("show.ejs", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find(p => p.id === id);
  if (post) {
    res.render("edit.ejs", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = (posts.length + 1) + "a"; // Generate a simple id
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params
  let { username, content } = req.body
  let post = posts.find(p => p.id === id)
  if (post) {
    if (username) post.username = username
    if (content) post.content = content
    res.redirect("/posts")
  } else {
    res.status(404).send("Post not found")
  }
})
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params
  posts = posts.filter(p => p.id !== id)
  res.redirect("/posts")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});