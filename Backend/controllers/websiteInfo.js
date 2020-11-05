// IMPORTS THE MODELS
const WebsiteInfo = require("../models/websiteInfo");

const compress_images = require("compress-images");
const fs = require("fs");

const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEYID,
  secretAccessKey: process.env.AWS_SECRETKEY,
});

const tempImagePath = "tempImg/*.{jpg,JPG,jpeg,JPEG,png}";
const outputImagePath = "public/images/";

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

const uploadFile = (fileName) => {
  // Read content from the file
  fs.readFile("public/images/" + fileName, (err, data) => {
    if (err) {
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

exports.update = (req, res, next) => {
  let websiteInfo;
  if (req.body.departmentPage) {
    websiteInfo = {
      departmentPage: {
        details: req.body.departmentPage.detail,
      },
    };
  } else if (req.body.aboutUsPage) {
    websiteInfo = {
      aboutUsPage: {
        details: req.body.aboutUsPage.details,
        mission: req.body.aboutUsPage.mission,
        galleryDetail: req.body.aboutUsPage.galleryDetail,
      },
    };
  }

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
    req.body.oldImages.forEach((image) => {
      websiteInfo.landingPage.joinParaImages.push(image);
    });
  }

  let deteleArray = [];
  if (req.body.deletePicArray) {
    req.body.deletePicArray.forEach((pic) => {
      deteleArray.push(pic);
    });
  }

  if (req.files) {
    req.files.forEach((image) => {
      websiteInfo.landingPage.joinParaImages.push(image.filename);
    });
  }

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
        if (deteleArray.length > 0) {
          deleteFile(deteleArray);
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

// exports.edit = (req, res, next) => {
//   let imageDelete = [];
//   if (req.body.imageDelete != null && req.body.imageDelete != "null") {
//     req.body.imageDelete.forEach((image) => {
//       if (image != "null") {
//         imageDelete.push(image);
//       }
//     });
//   }

//   const department = {
//     images: [],
//     title: req.body.title,
//     about: req.body.about,
//     colors: {
//       primary: req.body.primary,
//       secondary: req.body.secondary,
//       tertiary: req.body.tertiary,
//     },
//   };

//   req.body.oldImages.forEach((oldImage) => {
//     if (oldImage != "null") {
//       let inDelete = false;
//       imageDelete.forEach((image) => {
//         if (image == oldImage) {
//           inDelete = true;
//         }
//       });
//       if (!inDelete) {
//         department.images.push(oldImage);
//       }
//     }
//   });

//   if (req.files) {
//     req.files.forEach((image) => {
//       department.images.push(image.filename);
//     });
//     compress_images(
//       tempImagePath,
//       outputImagePath,
//       { compress_force: false, statistic: true, autoupdate: true },
//       false,
//       { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
//       {
//         png: {
//           engine: "pngquant",
//           command: ["--quality=20-50", "-o"],
//         },
//       },
//       { svg: { engine: false, command: false } },
//       {
//         gif: {
//           engine: false,
//           command: false,
//         },
//       },
//       function (error, completed, statistic) {
//         if (completed) {
//           let i = 1;
//           req.files.forEach((image) => {
//             try {
//               fs.unlinkSync("tempImg/" + image.filename);
//               fs.unlinkSync("tempImg/" + image.filename);
//               fs.unlinkSync("tempImg/" + image.filename);
//               fs.unlinkSync("tempImg/" + image.filename);
//             } catch (err) {}
//             try {
//               uploadFile(image.filename, req.body.imageFolder);
//               i++;
//             } catch (err) {}
//           });
//         }
//       }
//     );
//   }

//   Department.updateOne({ _id: req.params.id }, department)
//     .then((result) => {
//       if (result.n == 0) {
//         res.status(404).json({
//           error: "Update failed!",
//         });
//       } else {
//         res.status(201).json({
//           message: "Update successfull!",
//         });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({
//         error: error,
//         errorMessage: "An unknown error occured!",
//       });
//     });
// };
