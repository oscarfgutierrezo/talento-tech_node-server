// Importaciones
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const houseRoutes = require("./routes/HousesRoutes");
require("dotenv").config();

// Variables de entorno
const DB_URL = process.env.DB_URL || "";

// Conexion a base de datos Mongo
mongoose.connect(DB_URL);

// Instancia Express
const router = express.Router();
const app = express();

// Configuración servidor Socket
const socket = require("socket.io");
const http = require("http").Server(app);
const io = socket(http);

// Verificar si un cliente se conecta al servidor de socket
io.on("connect", (socket) => {
  console.log("connected");

  socket.on("message", (data) => {
    console.log(data);

    socket.emit("message-receipt", {
      message: "Mensaje recibido en el servidor",
    });
  });
});

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Manejo de rutas
app.get("/test", (req, res) => {
  res.send("Hello World");
});

// Middlewares
app.use((req, res, next) => {
  res.io = io;
  next();
});
app.use(router);
app.use("/uploads", express.static("uploads"));
app.use("/", userRoutes); // Las rutas de userRoutes se manejan con base en la ruta '/'
app.use("/", houseRoutes); // Las rutas de userRoutes se manejan con base en la ruta '/'

// Inicio de servidor, escuchando en el puerto indicado
const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
