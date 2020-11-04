const express = require("express");

const ServiceController = require("../controllers/service");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tempImg");
  },
  filename: (req, file, cb) => {
    const name =
      file.originalname.split(" ").join("-") +
      "." +
      MIME_TYPE_MAP[file.mimetype];
    cb(null, name);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// POST REQUEST
// router.post(
//   "/addOne",
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"),
//   ServiceController.addOne
// );

// GET REQUEST
// router.get("/getAll", ServiceController.getAll);

// UPDATE REQUEST
// router.put(
//   "/updateOne/:id",
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"),
//   ServiceController.edit
// );

// DELETE REQUEST
// router.delete("/deleteOne/:id", ServiceController.deleteOne);

module.exports = router;
