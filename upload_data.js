const xlsx = require("xlsx");
require("dotenv").config();
const bcrypt = require("bcrypt");

const DB_URL = process.env.DB_URL || "";
const mongoose = require("mongoose");
mongoose.connect(DB_URL);
const UserSchema = require("./models/User");
const User = require("./models/User");

// Leer archivo excel
const workbook = xlsx.readFile("datos.xlsx");
const sheet_list = workbook.SheetNames;
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_list[0]]);

//Hashear password
for (const user of data) {
  user.email = user.email.trim().toLowerCase();
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  user.password = hashedPassword;

  // Crear schema y subir info a DB
  UserSchema({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    id: user.id,
    password: hashedPassword,
  })
    .save()
    .then((result) => {
      console.log(`${user.name} uploaded successfully`);
    })
    .catch((err) => {
      console.log(`Error uploading ${user.name}`);
    });
}
