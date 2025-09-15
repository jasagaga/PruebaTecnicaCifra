const express = require("express");
const router = express.Router();

// Importar controladores
const authController = require("../controllers/authController");
const register = require("../controllers/authController").register;

// Rutas de autenticación
router.post("/login", authController.login);
router.post("/register", register);


module.exports = router;
