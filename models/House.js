// Importacion de librería
const mongoose = require("mongoose");
const fetch = require("node-fetch");

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
    validate: {
      validator: async (state) => {
        const response = await fetch(
          "http://api-colombia.com/api/v1/Department"
        );
        const departaments = await response.json();
        return departaments.some((departament) =>
          departament.name.toUpperCase().includes(state.toUpperCase())
        );
      },
      message: (props) => `${props.value} isn't a state of Colombia`,
    },
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
  price: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("house", HouseSchema);
