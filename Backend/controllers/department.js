// IMPORTS THE MODELS
const Department = require("../models/department");

const compress_images = require("compress-images");
const fs = require("fs");

const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEYID,
  secretAccessKey: process.env.AWS_SECRETKEY,
});

const tempImagePath = "tempImg/*.{jpg,JPG,jpeg,JPEG,png}";
const outputImagePath = "public/images/";
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const uploadFile = (fileName) => {
  // Read content from the file
  fs.readFile("public/images/" + fileName, (err, data) => {
    if (err) {
      console.log("Error uploading image! Image could not be read.");
    }
    let params = {
      Bucket: process.env.BUCKET_NAME,
      Key: "department/" + fileName, // File name you want to save as in S3
      Body: data,
    };
    s3.upload(params, function (err, data) {
      if (err) {
        console.log("Error uploading image! Connection to DB failed.");
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

exports.getAll = (req, res, next) => {
  Department.find()
    .then((documents) => {
      if (documents) {
        res.status(200).json({
          departments: documents,
        });
      } else {
        res.status(404).json({
          error: "Nothing was found!",
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

exports.addOne = (req, res, next) => {
  const department = new Department({
    _id: null,
    date: new Date(),
    images: [],
    title: req.body.title,
    about: req.body.about,
  });

  department
    .save()
    .then(() => {
      if (req.files) {
        Department.findOne({ title: department.title })
          .then((addedDepartment) => {
            let i = 1;
            let myImages = [];
            req.files.forEach((image) => {
              const fileType = MIME_TYPE_MAP[image.mimetype];
              myImages.push(addedDepartment._id + "_" + i + "." + fileType);
              department.images.push(
                addedDepartment._id + "_" + i + "." + fileType
              );
              i++;
            });
            Department.updateOne(
              { _id: addedDepartment._id },
              { images: myImages }
            ).then(() => {
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
                      const fileType = MIME_TYPE_MAP[image.mimetype];
                      try {
                        fs.unlinkSync("tempImg/" + image.filename);
                        fs.unlinkSync("tempImg/" + image.filename);
                        fs.unlinkSync("tempImg/" + image.filename);
                        fs.unlinkSync("tempImg/" + image.filename);
                        fs.unlinkSync("tempImg/" + image.filename);
                        fs.unlinkSync("tempImg/" + image.filename);
                        fs.unlinkSync("tempImg/" + image.filename);
                        fs.unlinkSync("tempImg/" + image.filename);
                        fs.unlinkSync("tempImg/" + image.filename);
                        fs.unlinkSync("tempImg/" + image.filename);
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
                        fs.renameSync(
                          "public/images/" + image.filename,
                          "public/images/" +
                            addedDepartment._id +
                            "_" +
                            i +
                            "." +
                            fileType
                        );
                        uploadFile(
                          addedDepartment._id + "_" + i + "." + fileType
                        );
                        i++;
                      } catch (err) {}
                    });
                    res.status(201).json({
                      message: "Successfully added!",
                      id: addedDepartment._id,
                      images: addedDepartment.images,
                    });
                  }
                }
              );
            });
          })
          .catch((error) => {
            res.status(202).json({
              error: error,
              errorMessage:
                "Successfully added but with some errors! (Pictures might have no been uploaded)",
              id: addedDepartment._id,
              images: addedDepartment.images,
            });
          });
      } else {
        Department.findOne({ title: department.title }).then(
          (addedDepartment) => {
            res.status(201).json({
              message: "Successfully added!",
              id: addedDepartment._id,
              images: addedDepartment.images,
            });
          }
        );
      }
    })
    .catch((error) => {
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
          fs.unlinkSync("tempImg/" + image.filename);
          fs.unlinkSync("tempImg/" + image.filename);
          fs.unlinkSync("tempImg/" + image.filename);
          fs.unlinkSync("tempImg/" + image.filename);
          fs.unlinkSync("tempImg/" + image.filename);
          fs.unlinkSync("tempImg/" + image.filename);
          fs.unlinkSync("tempImg/" + image.filename);
          fs.unlinkSync("tempImg/" + image.filename);
          fs.unlinkSync("tempImg/" + image.filename);
          fs.unlinkSync("tempImg/" + image.filename);
        } catch (err) {}
      });
      if (
        error.errors.title.properties.type &&
        error.errors.title.properties.type == "unique"
      ) {
        res.status(404).json({
          error: "Error occured! This department name already exist.",
        });
      } else {
        res.status(500).json({
          error: "An unknown error occured!.",
          errorMessage: error,
        });
      }
    });
};

exports.edit = (req, res, next) => {
  // const blog = {
  //   image: req.body.oldFileName,
  //   name: req.body.name,
  //   title: req.body.title,
  //   detail: req.body.detail,
  // };
  // if (req.file) {
  //   const image = req.file;
  //   blog.image = image.filename;
  //   const fileName = image.filename.substring(0, image.filename.length - 3);
  //   compress_images(
  //     tempImagePath,
  //     outputImagePath,
  //     { compress_force: false, statistic: true, autoupdate: true },
  //     false,
  //     { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
  //     { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
  //     { svg: { engine: false, command: false } },
  //     {
  //       gif: {
  //         engine: false,
  //         command: false,
  //       },
  //     },
  //     function (error, completed, statistic) {
  //       try {
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //         fs.unlinkSync("tempImg/" + fileName + "jpg");
  //       } catch (err) {}
  //       try {
  //         fs.unlinkSync("tempImg/" + fileName + "png");
  //         fs.unlinkSync("tempImg/" + fileName + "png");
  //         fs.unlinkSync("tempImg/" + fileName + "png");
  //         fs.unlinkSync("tempImg/" + fileName + "png");
  //         fs.unlinkSync("tempImg/" + fileName + "png");
  //         fs.unlinkSync("tempImg/" + fileName + "png");
  //         fs.unlinkSync("tempImg/" + fileName + "png");
  //         fs.unlinkSync("tempImg/" + fileName + "png");
  //         fs.unlinkSync("tempImg/" + fileName + "png");
  //         fs.unlinkSync("tempImg/" + fileName + "png");
  //         fs.unlinkSync("tempImg/" + fileName + "png");
  //         fs.unlinkSync("tempImg/" + fileName + "png");
  //         fs.unlinkSync("tempImg/" + fileName + "png");
  //         fs.unlinkSync("tempImg/" + fileName + "png");
  //         fs.unlinkSync("tempImg/" + fileName + "png");
  //         fs.unlinkSync("tempImg/" + fileName + "png");
  //         fs.unlinkSync("tempImg/" + fileName + "png");
  //         fs.unlinkSync("tempImg/" + fileName + "png");
  //       } catch (err) {}
  //       uploadFile(image.filename);
  //     }
  //   );
  // }
  // Blog.updateOne({ _id: req.params.id }, blog)
  //   .then((result) => {
  //     if (result.n == 0) {
  //       res.status(404).json({
  //         error: "Nothing updated!",
  //       });
  //     } else {
  //       res.status(201).json({
  //         message: "Update successfull!",
  //       });
  //     }
  //   })
  //   .catch((error) => {
  //     res.status(500).json({
  //       error: "An unknown error occured!.",
  //       errorMessage: error,
  //     });
  //   });
};

exports.deleteOne = (req, res, next) => {};
