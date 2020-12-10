// IMPORTS THE MODELS
const WebsiteInfo = require("../models/websiteInfo");

// IMAGE COMPRESSION NEEDED VARIABLES
const compress_images = require("compress-images");
const fs = require("fs");
const tempImagePath = "tempImg/*.{jpg,JPG,jpeg,JPEG,png}";
const outputImagePath = "public/images/";

// AWS S3 CONNECTION
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEYID,
  secretAccessKey: process.env.AWS_SECRETKEY,
});

// AWS S3 FILE DELETION FUNCTION
const deleteFile = (fileNames) => {
  let objects = [];
  fileNames.forEach((fileName) => {
    objects.push({
      Key: "websiteInfo/" + fileName,
    });
  });

  let params = {
    Bucket: process.env.BUCKET_NAME,
    Delete: {
      Objects: objects,
    },
  };

  s3.deleteObjects(params, function (err, data) {
    if (err) {
      console.log(err);
    }
    console.log(`Successfully deleted file from bucket`);
  });
};

// AWS S3 FILE UPLOAD FUNCTION
const uploadFile = (fileName) => {
  // Read content from the file
  fs.readFile("public/images/" + fileName, (err, data) => {
    if (err) {
      F;
      console.log("Error uploading image! Image could not be read.");
    }
    let params = {
      Bucket: process.env.BUCKET_NAME,
      Key: "websiteInfo/" + fileName, // File name you want to save as in S3
      Body: data,
    };
    s3.upload(params, function (err, data) {
      if (err) {
        console.log("Error uploading image! Connection failed.");
      }
      try {
        fs.unlinkSync("public/images/" + fileName);
        fs.unlinkSync("public/images/" + fileName);
        fs.unlinkSync("public/images/" + fileName);
        fs.unlinkSync("public/images/" + fileName);
        fs.unlinkSync("public/images/" + fileName);
      } catch (err) {}
      console.log(`Image uploaded successfully. ${data.Location}`);
    });
  });
};

// GET WEBSITE INFO
exports.get = (req, res, next) => {
  WebsiteInfo.findOne()
    .then((document) => {
      if (document) {
        res.status(200).json({
          websiteInfo: document,
        });
      } else {
        res.status(404).json({
          error: "Nothing was found!",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
        errorMessage: "An unknown error occured!",
      });
    });
};

// UPDATE DEPARTMENT PAGE
exports.updateDepartmentPage = (req, res, next) => {
  let websiteInfo = {
    departmentPage: {
      details: req.body.details,
    },
  };

  WebsiteInfo.updateOne({ _id: req.params.id }, websiteInfo)
    .then((result) => {
      if (result.n == 0) {
        res.status(404).json({
          error: "Update failed!",
        });
      } else {
        res.status(201).json({
          message: "Update successfull!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        errorMessage: "An unknown error occured!",
      });
    });
};

// UPDATE ABOUT US PAGE
exports.updateAbout = (req, res, next) => {
  websiteInfo = {
    aboutUsPage: {
      image: req.body.oldImage,
      details: req.body.details,
      mission: req.body.mission,
      galleryDetail: req.body.galleryDetail,
    },
  };

  if (req.file) {
    websiteInfo.aboutUsPage.image = req.file.filename;
  }

  WebsiteInfo.updateOne({ _id: req.params.id }, websiteInfo)
    .then((result) => {
      if (result.n == 0) {
        res.status(404).json({
          error: "Update failed!",
        });
      } else {
        if (req.file) {
          compress_images(
            tempImagePath,
            outputImagePath,
            { compress_force: false, statistic: true, autoupdate: true },
            false,
            { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
            {
              png: {
                engine: "pngquant",
                command: ["--quality=20-50", "-o"],
              },
            },
            { svg: { engine: false, command: false } },
            {
              gif: {
                engine: false,
                command: false,
              },
            },
            function (error, completed, statistic) {
              try {
                fs.unlinkSync("tempImg/" + req.file.filename);
                fs.unlinkSync("tempImg/" + req.file.filename);
                fs.unlinkSync("tempImg/" + req.file.filename);
                fs.unlinkSync("tempImg/" + req.file.filename);
                fs.unlinkSync("tempImg/" + req.file.filename);
                fs.unlinkSync("tempImg/" + req.file.filename);
                fs.unlinkSync("tempImg/" + req.file.filename);
                fs.unlinkSync("tempImg/" + req.file.filename);
              } catch (err) {}
              try {
                uploadFile(req.file.filename);
              } catch (err) {}
            }
          );
        }
        res.status(201).json({
          message: "Update successfull!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        errorMessage: "An unknown error occured!",
      });
    });
};

// UPDATE JOIN US PAGE
exports.updateJoin = (req, res, next) => {
  websiteInfo = {
    joinUsPage: {
      image: req.body.oldImage,
    },
  };

  if (req.file) {
    websiteInfo.joinUsPage.image = req.file.filename;
  }

  WebsiteInfo.updateOne({ _id: req.params.id }, websiteInfo)
    .then((result) => {
      if (result.n == 0) {
        res.status(404).json({
          error: "Update failed!",
        });
      } else {
        if (req.file) {
          compress_images(
            tempImagePath,
            outputImagePath,
            { compress_force: false, statistic: true, autoupdate: true },
            false,
            { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
            {
              png: {
                engine: "pngquant",
                command: ["--quality=20-50", "-o"],
              },
            },
            { svg: { engine: false, command: false } },
            {
              gif: {
                engine: false,
                command: false,
              },
            },
            function (error, completed, statistic) {
              try {
                fs.unlinkSync("tempImg/" + req.file.filename);
                fs.unlinkSync("tempImg/" + req.file.filename);
                fs.unlinkSync("tempImg/" + req.file.filename);
                fs.unlinkSync("tempImg/" + req.file.filename);
                fs.unlinkSync("tempImg/" + req.file.filename);
                fs.unlinkSync("tempImg/" + req.file.filename);
                fs.unlinkSync("tempImg/" + req.file.filename);
                fs.unlinkSync("tempImg/" + req.file.filename);
              } catch (err) {}
              try {
                uploadFile(req.file.filename);
              } catch (err) {}
            }
          );
        }
        res.status(201).json({
          message: "Update successfull!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        errorMessage: "An unknown error occured!",
      });
    });
};

// UPDATE LANDING PAGE
exports.updateLanding = (req, res, next) => {
  let websiteInfo = {
    landingPage: {
      detail: req.body.detail,
      helpPara: req.body.helpPara,
      joinPara: req.body.joinPara,
      joinParaImages: [],
    },
  };

  if (req.body.oldImages) {
    if (Array.isArray(req.body.oldImages)) {
      req.body.oldImages.forEach((image) => {
        websiteInfo.landingPage.joinParaImages.push(image);
      });
    } else {
      websiteInfo.landingPage.joinParaImages.push(req.body.oldImages);
    }
  }

  let deleteArray = [];
  if (req.body.deletePicArray) {
    if (Array.isArray(req.body.deletePicArray)) {
      req.body.deletePicArray.forEach((pic) => {
        deleteArray.push(pic);
      });
    } else {
      deleteArray.push(req.body.deletePicArray);
    }
  }

  if (req.files) {
    req.files.forEach((image) => {
      websiteInfo.landingPage.joinParaImages.push(image.filename);
    });
  }

  console.log(websiteInfo, deleteArray);

  WebsiteInfo.updateOne({ _id: req.params.id }, websiteInfo)
    .then((result) => {
      if (result.n == 0) {
        res.status(404).json({
          error: "Update failed!",
        });
      } else {
        if (req.files) {
          compress_images(
            tempImagePath,
            outputImagePath,
            { compress_force: false, statistic: true, autoupdate: true },
            false,
            { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
            {
              png: {
                engine: "pngquant",
                command: ["--quality=20-50", "-o"],
              },
            },
            { svg: { engine: false, command: false } },
            {
              gif: {
                engine: false,
                command: false,
              },
            },
            function (error, completed, statistic) {
              if (completed) {
                let i = 1;
                req.files.forEach((image) => {
                  try {
                    fs.unlinkSync("tempImg/" + image.filename);
                    fs.unlinkSync("tempImg/" + image.filename);
                    fs.unlinkSync("tempImg/" + image.filename);
                    fs.unlinkSync("tempImg/" + image.filename);
                    fs.unlinkSync("tempImg/" + image.filename);
                    fs.unlinkSync("tempImg/" + image.filename);
                    fs.unlinkSync("tempImg/" + image.filename);
                    fs.unlinkSync("tempImg/" + image.filename);
                  } catch (err) {}
                  try {
                    uploadFile(image.filename);
                  } catch (err) {}
                });
              }
            }
          );
        }
        if (req.body.deletePicArray) {
          deleteFile(deleteArray);
        }
        res.status(201).json({
          message: "Update successfull!",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
        errorMessage: "An unknown error occured!",
      });
    });
};
