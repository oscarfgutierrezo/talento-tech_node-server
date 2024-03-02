const fs = require("fs");
const express = require("express");
const router = express.Router();

router.get("/departments", (req, res) => {
  fs.readFile("departments.json", "utf8", (err, data) => {
    if (err) {
      res
        .status(500)
        .send({ status: "error", message: "Error obteniendo la información" });
      return;
    }
    res.send(JSON.parse(data));
  });
});

router.post("/departments", (req, res) => {
  fs.readFile("departments.json", "utf-8", (err, data) => {
    const departments = JSON.parse(data);
    departments.push(req.body);
    fs.writeFile("departments.json", JSON.stringify(departments), (err) => {
      if (err) {
        res.send(err);
        return;
      }
      res.send(req.body);
    });
  });
});

module.exports = router;
