const express = require("express");

const BlogController = require("../controllers/blog");

// const checkAuth = require("../middleware/check-auth");

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
      file.originalname.toLocaleLowerCase().split(" ").join("-") +
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
//   "/addAccommodations",
//   checkAuth,
//   multer({ storage: fileStorage, fileFilter: fileFilter }).array("images", 20),
//   AccommodationController.addAccommodations
// );

// GET REQUEST
router.get("/getAll", BlogController.getAll);

// UPDATE REQUEST
router.put(
  "/updateOne/:id",
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"),
  BlogController.edit
);

// DELETE REQUEST
// router.delete("/:id", AccommodationController.deleteAccommodation);

module.exports = router;
