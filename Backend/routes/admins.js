const express = require("express");

const AdminController = require("../controllers/admin");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

// POST REQUEST
router.post("/login", AdminController.login);

// GET REQUEST
router.get("/getAdmin", AdminController.getAdmin);

// UPDATE REQUEST
router.put("/updatePassword", AdminController.updatePassword);

module.exports = router;
