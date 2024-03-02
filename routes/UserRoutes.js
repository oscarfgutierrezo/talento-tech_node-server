const express = require("express");
const bcrypt = require("bcrypt");
const UserSchema = require("../models/User.js");
const UserController = require("../controllers/UserController.js");
const multer = require("multer");

const router = express();
const userController = new UserController();

// Recuperar todos los usuarios
/* router.get("/user", userController.validateToken, (req, res) => {
  UserSchema.find({}).then((users) => res.json(users).status(200));
}); */

router.get("/user", (req, res) => {
  UserSchema.find({}).then((users) => res.json(users).status(200));
});

// Recuperar usuario por ID
router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const user = await UserSchema.findById(id);
  res.json(user);
});

// Recuperar usuario por email
router.get("/email/:email", (req, res) => {
  const email = req.params.email;
  UserSchema.where({ email: email }).then((user) => res.json(user));
});

// Almacenar un usuario nuevo
router.post("/user", async (req, res) => {
  const { name, lastname, email, password, id } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new UserSchema({
    id,
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
      res.send({ status: "error", message: err });
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

// Login
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  userController.login(email, password).then((result) => {
    if (result.status == "error") {
      res.status(401).send(result);
    } else {
      res.send(result);
    }
  });
});

// Middleware configuración Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  console.log(file.mimetype);

  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("El archivo no es una imagen"));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Servicio almacenamiento de archivos
router.post("/upload/:id/user", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({
      status: "error",
      message: "No se proporcionó ningún archivo",
    });
  }

  const id = req.params.id;

  const updateUser = {
    avatar: req.file.path,
  };

  UserSchema.findByIdAndUpdate(id, updateUser, { new: true })
    .then((result) =>
      res.send({
        status: "sucess",
        message: "File uploated successfully",
      })
    )
    .catch((error) => {
      console.log(error);
      res.send({ status: "error", message: "Error updating user" });
    });

  res.send({
    status: "success",
    message: "Archivo subido correctamente",
  });
});

module.exports = router;
