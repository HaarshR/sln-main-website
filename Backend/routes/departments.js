const express = require("express");

const DepartmentController = require("../controllers/department");

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
router.post(
  "/addOne",
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("images", 200),
  DepartmentController.addOne
);

// GET REQUEST
router.get("/getAll", DepartmentController.getAll);

// UPDATE REQUEST
router.put(
  "/updateOne/:id",
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("image", 200),
  DepartmentController.edit
);

// DELETE REQUEST
router.delete("/:id", DepartmentController.deleteOne);

module.exports = router;
