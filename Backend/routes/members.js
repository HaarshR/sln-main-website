const express = require("express");

const MemberController = require("../controllers/member");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

// POST REQUEST
router.post("/sendMail/:memberType", MemberController.sendEmail);

// GET REQUEST
router.get("/getAll/:memberType", MemberController.getAll);

// DELETE REQUEST
router.delete("/deleteOne/:id", MemberController.deleteOne);

module.exports = router;
