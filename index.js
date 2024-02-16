// Importaciones
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");

// Conexion a base de datos Mongo
mongoose.connect(
  "mongodb+srv://oscarfgutierrezo:Fernando_71611556@cluster0.b92mxy5.mongodb.net/talentotech-users"
);

// Instancia Express
const router = express.Router();
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Manejo de rutas
app.get("/test", (req, res) => {
  res.send("Hello World");
});

// Inicio de servidor, escuchando en el puerto indicado
const PORT = 3000;
app.use(router);
app.use("/", userRoutes); // Las rutas de userRoutes se manejan con base en la ruta '/'
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
