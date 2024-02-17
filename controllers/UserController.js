const bcrypt = require("bcrypt");
const UserSchema = require("../models/User.js");

class UserController {
  constructor() {}

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

      return { status: "success" };
    } catch (error) {
      console.log(error);
      return { status: "error", message: "Error al iniciar sesión" };
    }
  }
}

module.exports = UserController;
