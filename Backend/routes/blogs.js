const express = require("express");

const BlogController = require("../controllers/blog");

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
router.post(
  "/addOne",
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"),
  BlogController.addOne
);

// GET REQUEST
router.get("/getAll", BlogController.getAll);
router.get("/getOne/:id", BlogController.getOne);

// UPDATE REQUEST
router.put(
  "/updateOne/:id",
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"),
  BlogController.edit
);
router.put("/addComment/:id", BlogController.addComment);

// DELETE REQUEST
router.delete("/deleteOne/:id&:image", BlogController.deleteOne);

module.exports = router;
