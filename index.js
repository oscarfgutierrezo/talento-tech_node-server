// Configuración Express
const express = require("express");
const app = express();
const router = express.Router();

// Variables de entorno
require("dotenv").config();

// Configuración servidor Socket
const socket = require("socket.io");
const http = require("http").Server(app);
const io = socket(http);

// Importar y crear servidor GraphQL
const { createYoga } = require("graphql-yoga");
const schema = require("./graphql/schema");

// Configuracion DB
const DB_URL = process.env.DB_URL || "";
const mongoose = require("mongoose");
mongoose.connect(DB_URL);

// Importaciones Routes
const userRoutes = require("./routes/UserRoutes");
const houseRoutes = require("./routes/HousesRoutes");
const messageRoutes = require("./routes/MessageRoutes");
const departmentsRoutes = require("./read_file");

const MessageSchema = require("./models/Message");

// Verificar si un cliente se conecta al servidor de socket
io.on("connect", (socket) => {
  console.log("connected");

  // Escuchando eventos del servidor
  socket.on("message", (data) => {
    // Almacenar mensaje en DB
    const payload = JSON.parse(data);
    MessageSchema(payload)
      .save()
      .then((result) => {
        socket.broadcast.emit("message-receipt", payload);
      })
      .catch((error) => {
        log({ status: "error", message: error.message });
      });
  });

  socket.on("disconnect", (socket) => {
    console.log("disconnect");
  });
});

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Manejo de rutas
app.get("/test", (req, res) => {
  res.send("Hello World").status(200);
});

// Middlewares
app.use((req, res, next) => {
  res.io = io;
  next();
});

const yoga = new createYoga({ schema });
app.use("/graphql", yoga);

app.use(router);
app.use("/uploads", express.static("uploads"));
app.use("/", userRoutes); // Las rutas de userRoutes se manejan con base en la ruta '/'
app.use("/", houseRoutes); // Las rutas de houseRoutes se manejan con base en la ruta '/'
app.use("/", messageRoutes); // Las rutas de messageRoutes se manejan con base en la ruta '/'
app.use("/", departmentsRoutes); // Las rutas de departmentsRoutes se manejan con base en la ruta '/'

// Inicio de servidor, escuchando en el puerto indicado
const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = http;
