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
  const house = new HouseSchema({
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    size: req.body.size,
    zip_code: req.body.zip_code,
    rooms: req.body.rooms,
    bathrooms: req.body.bathrooms,
    parking: req.body.parking,
    price: req.body.price,
    code: req.body.code,
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

// Actualizar info house por ID
router.patch("/house/:id", (req, res) => {
  const id = req.params.id;
  const updatedHouse = {
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    size: req.body.size,
    zip_code: req.body.zip_code,
    rooms: req.body.rooms,
    bathrooms: req.body.bathrooms,
    parking: req.body.parking,
    code: req.body.code,
  };

  HouseSchema.findByIdAndUpdate(id, updatedHouse, { new: true })
    .then((result) =>
      res.send({
        status: "sucess",
        message: "House updated successfully",
        updatedHouse: result,
      })
    )
    .catch((error) => {
      console.log(error);
      res.send({ status: "error", message: "Error updating house" });
    });
});

module.exports = router;
