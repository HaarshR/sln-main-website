const express = require("express");

const WebsiteInfoController = require("../controllers/websiteInfo");

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

// GET REQUEST
router.get("/get", WebsiteInfoController.get);

// UPDATE REQUEST
router.put(
  "/updateDepartmentPage/:id",
  WebsiteInfoController.updateDepartmentPage
);
router.put(
  "/updateLanding/:id",
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("images", 200),
  WebsiteInfoController.updateLanding
);
router.put(
  "/updateAboutUs/:id",
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"),
  WebsiteInfoController.updateAbout
);

module.exports = router;
