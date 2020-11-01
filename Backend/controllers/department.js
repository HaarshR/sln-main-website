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

const deleteFile = (fileNames, title) => {
  let objects = [];
  fileNames.forEach((fileName) => {
    objects.push({
      Key: "department/" + title + "/" + fileName,
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

const uploadFile = (fileName, title) => {
  // Read content from the file
  fs.readFile("public/images/" + fileName, (err, data) => {
    if (err) {
      console.log("Error uploading image! Image could not be read.");
    }
    console.log(fileName);
    let params = {
      Bucket: process.env.BUCKET_NAME,
      Key: "department/" + title + "/" + fileName, // File name you want to save as in S3
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
      if (documents.length != 0) {
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
  console.log(req.body);
  const department = new Department({
    _id: null,
    date: new Date(),
    images: [],
    title: req.body.title,
    about: req.body.about,
    colors: {
      primary: req.body.primary,
      secondary: req.body.secondary,
      tertiary: req.body.tertiary,
    },
  });

  let i = 1;
  req.files.forEach((image) => {
    department.images.push(image.filename);
    i++;
  });

  department
    .save()
    .then(() => {
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
                  uploadFile(image.filename, req.body.title.replace(" ", "-"));
                  i++;
                } catch (err) {}
              });
            }
          }
        );
      }
      res.status(201).json({
        message: "Successfully added!",
        id: "Refresh the Page",
        images: department.images,
      });
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
      console.log(error);
      // if (
      //   error.errors.title.properties.type &&
      //   error.errors.title.properties.type == "unique"
      // ) {
      //   res.status(404).json({
      //     error: "Error occured! This department name already exist.",
      //   });
      // } else {
      //   res.status(500).json({
      //     error: "An unknown error occured!.",
      //     errorMessage: error,
      //   });
      // }
    });
};

exports.edit = (req, res, next) => {
  let imageDelete = [];
  if (req.body.imageDelete != null && req.body.imageDelete != "null") {
    deleteFile(req.body.imageDelete, req.body.title);
    req.body.imageDelete.forEach((image) => {
      if (image != "null") {
        imageDelete.push(image);
      }
    });
  }

  const department = {
    images: [],
    title: req.body.title,
    about: req.body.about,
    colors: {
      primary: req.body.primary,
      secondary: req.body.secondary,
      tertiary: req.body.tertiary,
    },
  };

  req.body.oldImages.forEach((oldImage) => {
    if (oldImage != "null") {
      let inDelete = false;
      imageDelete.forEach((image) => {
        if (image == oldImage) {
          inDelete = true;
        }
      });
      if (!inDelete) {
        department.images.push(oldImage);
      }
    }
  });

  if (req.files) {
    req.files.forEach((image) => {
      department.images.push(image.filename);
      console.log(department, req.params.id);
      const fileName = image.filename.substring(0, image.filename.length - 3);
      try {
        deleteFile(fileName + "jpg", department.title);
      } catch (err) {}
      try {
        deleteFile(fileName + "png", department.title);
      } catch (err) {}
    });
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
            } catch (err) {}
            try {
              uploadFile(image.filename, req.body.title.replace(" ", "-"));
              i++;
            } catch (err) {}
          });
        }
      }
    );
  }
  console.log(department);
  Department.updateOne({ _id: req.params.id }, department)
    .then((result) => {
      console.log(result);
      if (result.n == 0) {
        res.status(404).json({
          error: "Update unsuccessfull!",
        });
      } else {
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

exports.deleteOne = (req, res, next) => {
  Department.findOne({ _id: req.params.id }).then((document) => {
    Department.deleteOne({ _id: req.params.id })
      .then((result) => {
        if (result.n > 0) {
          deleteFile(document.images, document.title.replace(" ", "-"));
          res.status(200).json({ message: "Successfully removed!" });
        } else {
          res.status(404).json({
            error: "Nothing was deleted.",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          error: "An unknown error occured!.",
          errorMessage: error,
        });
      });
  });
};
