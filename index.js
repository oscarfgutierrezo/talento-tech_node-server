// Importaciones
const express = require("express");
const mongoose = require("mongoose");
const UserSchema = require("./models/User");

// Conexion a base de datos Mongo
mongoose.connect(
  "mongodb+srv://oscarfgutierrezo:Fernando_71611556@cluster0.b92mxy5.mongodb.net/talentotech-users"
);

// Instancia Express
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Manejo de rutas
app.get("/test", (req, res) => {
  res.send("Hello World");
});

app.get("/user", (req, res) => {
  UserSchema.find({}).then((users) => res.json(users));
});

app.post("/user", (req, res) => {
  const user = new UserSchema({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  user.save();
  res.json(user).status(201);
});

// Inicio de servidor, escuchando en el puerto indicado
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
