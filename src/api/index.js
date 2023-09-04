import express from "express";
import posts from "./data/posts.json" assert { type: "json" };
import users from "./data/users.json" assert { type: "json" };

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello there !");
});

// POSTS
app.get("/api/posts", (_, res) => {
  res.send(posts);
});

app.get("/api/posts/:id", (req, res) => {
  const post = posts.find((post) => post.id === +req.params.id);
  res.send(post);
});

// USERS
app.get("/api/users", (_, res) => {
  res.send(users);
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find((user) => user.id === +req.params.id);
  res.send(user);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
