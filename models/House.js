// Importacion de librería
const mongoose = require("mongoose");

// Definición de esquema => Estructura del modelo de usuarios (campo: tipo de variable)
const HouseSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
    validate: {
      validator: (size) => {
        return /^[0-9]+$/.test(size);
      },
      message: (props) => `${props.value} isn't a valid size`,
    },
  },
  zip_code: {
    type: Number,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  parking: {
    type: Boolean,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("house", HouseSchema);
