const bcrypt = require("bcrypt");
const UserSchema = require("../models/User.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserController {
  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET || "";
  }

  async login(email, password) {
    try {
      // Verificar si el email existe
      const user = await UserSchema.findOne({ email });
      if (!user) {
        return { status: "error", message: "El usuario no existe" };
      }

      // Verificar si la contraseña coincide con la almacenada en db
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { status: "error", message: "Contraseña incorrecta" };
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        this.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return { status: "success", token: token };
    } catch (error) {
      console.log(error);
      return { status: "error", message: "Error al iniciar sesión" };
    }
  }

  validateToken(req, res, next) {
    const bearerToken = req.headers["authorization"];
    if (!bearerToken) {
      return res.status(401).json({ message: "Token no existente" });
    }

    const token = bearerToken.startsWith("Bearer ")
      ? bearerToken.slice(7)
      : bearerToken;
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido" });
      }
      req.userId = decoded.userId;
      next();
    });
  }
}

module.exports = UserController;
