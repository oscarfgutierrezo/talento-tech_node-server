// Importacion de librería
const mongoose = require("mongoose");

// Definición de esquema => Estructura del modelo de usuarios (campo: tipo de variable)
const UserSchema = new mongoose.Schema({
  id: Number,
  name: String,
  lastname: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("user", UserSchema);
