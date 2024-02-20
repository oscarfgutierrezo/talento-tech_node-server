// Importacion de librería
const mongoose = require("mongoose");

// Definición de esquema => Estructura del modelo de usuarios (campo: tipo de variable)
const UserSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
      },
      message: (props) => `${props.value} no es un email válido`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", UserSchema);
