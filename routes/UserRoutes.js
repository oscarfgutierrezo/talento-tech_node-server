const express = require("express");
const UserSchema = require("../models/User.js");

const router = express();

// Recuperar todos los usuarios
router.get("/user", (req, res) => {
  UserSchema.find({}).then((users) => res.json(users));
});

// Recuperar usuario por ID
router.get("/user/:id", (req, res) => {
  const id = req.params.id;
  UserSchema.findById(id).then((user) => res.json(user));
});

// Recuperar usuario por email
router.get("/email/:email", (req, res) => {
  const email = req.params.email;
  UserSchema.where({ email: email }).then((user) => res.json(user));
});

// Almacenar un usuario nuevo
router.post("/user", (req, res) => {
  console.log(req.params);
  const user = new UserSchema({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  user.save();
  res.json(user).status(201);
});

module.exports = router;
