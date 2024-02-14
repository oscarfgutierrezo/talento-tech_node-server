const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Hello World");
});

// Parametros desde url
app.get("/name", (req, res) => {
  res.send(req.query.name);
});

// Parámetros desde body de la solicitur
app.post("/user", (req, res) => {
  const user = {
    name: req.body.name,
    lastname: req.body.lastname,
  };
  res.json(user).status(201);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
