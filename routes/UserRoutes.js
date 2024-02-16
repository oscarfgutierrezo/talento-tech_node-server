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
  user
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send("Error posting user");
    });
  res.json(user).status(201);
});

// Editar registro de usuario
router.patch("/user/:id", (req, res) => {
  const id = req.params.id;
  const updateUser = {
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
  };
  UserSchema.findByIdAndUpdate(id, updateUser)
    .then(() => res.send(updateUser))
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

// Eliminar registro de usuario
router.delete("/user/:id", (req, res) => {
  const id = req.params.id;
  UserSchema.deleteOne({ _id: id })
    .then(() => {
      res.json({ status: "success", message: "User deleted successfully" });
    })
    .catch((error) => {
      res.json({ status: "error", message: "Error deleting user" });
    });
});

module.exports = router;
