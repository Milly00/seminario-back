const express = require("express");
const router = express.Router();
const controllerUser = require("../controllers/users/UserController");

router.get("/buscar/:id", controllerUser);


module.exports = router;
