const express = require("express");
const router = express.Router();
const controllerUser = require("../controllers/auth/AuthRegister");
const controllerAuth = require("../controllers/auth/AuthController");

router.post("/crear", controllerUser);
router.post("/autentificar",controllerAuth);
router.get("/autentificado", controllerAuth);

module.exports = router;
