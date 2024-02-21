const express = require("express");
const router = express();
const HouseSchema = require("../models/House");

// Recuperar todas las casas
router.get("/houses", (req, res) => {
  HouseSchema.find({})
    .then((houses) => {
      res.send(houses);
    })
    .catch((err) => {
      console.log(err);
      res.send({ status: "error", message: err });
    });
});

// Recuperar casa por code
router.get("/house/:code", (req, res) => {
  const code = req.params.code;
  console.log(code);

  HouseSchema.where({ code: code })
    .then((house) => {
      res.send(house);
    })
    .catch((err) => {
      console.log(err);
      res.send({ status: "error", message: err });
    });
});

// Almacenar una casa nueva
router.post("/house", (req, res) => {
  const {
    address,
    city,
    state,
    size,
    zip_code,
    rooms,
    bathrooms,
    parking,
    code,
  } = req.body;

  const house = new HouseSchema({
    address,
    city,
    state,
    size,
    zip_code,
    rooms,
    bathrooms,
    parking,
    code,
  });

  house
    .save()
    .then((result) => {
      res.send({
        status: "sucess",
        message: "House posted successfully",
        house: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({ status: "error", message: err });
    });
});

module.exports = router;
