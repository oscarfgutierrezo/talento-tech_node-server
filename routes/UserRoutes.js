const express = require("express");
const bcrypt = require("bcrypt");
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
router.post("/user", async (req, res) => {
  const { name, lastname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new UserSchema({
    name,
    lastname,
    email,
    password: hashedPassword,
  });
  user
    .save()
    .then((result) => {
      res.send({
        status: "sucess",
        message: "User posted successfully",
        user: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({ status: "error", message: "Error posting user" });
    });
});

// Editar registro de usuario
router.patch("/user/:id", (req, res) => {
  const id = req.params.id;
  const updatedUser = {
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
  };
  UserSchema.findByIdAndUpdate(id, updatedUser, { new: true })
    .then((result) =>
      res.send({
        status: "sucess",
        message: "User updated successfully",
        updatedUser: result,
      })
    )
    .catch((error) => {
      console.log(error);
      res.send({ status: "error", message: "Error updating user" });
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
