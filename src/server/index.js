import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.use(express.json());
app.use(cors());

const posts = [
  {
    id: 1,
    title: "Post 1",
    content:
      "Enim sunt dolore cillum consectetur. Quis ipsum sint ipsum ea anim veniam qui. Magna adipisicing consectetur nulla minim. Nulla in Lorem ullamco labore id tempor irure. Voluptate qui aliquip proident incididunt sint Lorem nulla. Dolor irure consectetur cillum sunt qui reprehenderit reprehenderit cupidatat. Deserunt do incididunt consectetur non eiusmod ex minim commodo ut cillum aliqua sint reprehenderit. Cillum consectetur sunt labore laborum commodo duis. Commodo officia aliquip quis eiusmod adipisicing laboris duis officia mollit irure. Est enim elit nulla ex nulla. Nostrud do esse laborum eu amet qui et.",
  },
  {
    id: 2,
    title: "Post 2",
    content:
      "Non aute ipsum ullamco aute irure ex. Dolore laborum elit tempor mollit ex eu laboris in aliquip esse. Eu qui irure id labore excepteur mollit fugiat. Reprehenderit consectetur voluptate quis commodo proident mollit proident velit. Proident incididunt dolore do laborum culpa veniam anim. Reprehenderit nostrud aliquip mollit anim. Eu officia ea minim cupidatat excepteur tempor adipisicing. Veniam nostrud officia dolore consectetur. Officia ipsum duis aliqua Lorem culpa magna eu non irure minim magna do aute.",
  },
  {
    id: 3,
    title: "Post 3",
    content:
      "Velit labore ad eu velit tempor ea ex et. Deserunt sit cupidatat magna laborum enim enim nostrud esse ea consequat ut sunt officia. Et nostrud eu veniam amet. Ea irure dolore cupidatat nulla enim exercitation magna reprehenderit. Veniam tempor aliquip do nisi id dolor enim id sit proident nostrud qui laboris. Qui sint do incididunt dolore esse qui dolore dolore magna magna eu ipsum aliquip.",
  },
];

app.get("/", (req, res) => {
  res.send("Hello there !");
});

app.get("/api/posts", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  setTimeout(() => res.send(posts), 1000);
});

app.post("/api/posts", (req, res) => {
  const maxId = posts[posts.length - 1].id;
  posts.push({ ...req.body, id: maxId + 1 });
  setTimeout(() => res.send(posts[posts.length - 1]), 1000);
});

app.get("/api/posts/:id", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const post = posts.find((post) => post.id === +req.params.id);
  setTimeout(() => res.send(post), 1000);
});
