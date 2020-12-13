const express = require("express");

const MemberController = require("../controllers/member");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const multer = require("multer");

const MIME_TYPE_MAP = {
  "application/pdf": "pdf",
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tempImg");
  },
  filename: (req, file, cb) => {
    const name =
      file.originalname.split("@").join("-").split(" ").join("-") +
      "." +
      MIME_TYPE_MAP[file.mimetype];
    cb(null, name);
  },
});
const fileFilter = (req, file, cb) => {
  console.log(file.mimetype);
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// POST REQUEST
router.post("/sendMail/:memberType", MemberController.sendEmail);
router.post("/addOther/", MemberController.addOther);
router.post("/addRegular/", MemberController.addRegular);
router.post(
  "/addExecutive/",
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("cv"),
  MemberController.addExecutive
);

// GET REQUEST
router.get("/getAll/:memberType", MemberController.getAll);

// DELETE REQUEST
router.delete("/deleteOne/:id", MemberController.deleteOne);

module.exports = router;
