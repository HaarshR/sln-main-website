// IMPORTS THE MODELS
const Blog = require("../models/blog");

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
      console.log(err);
    }
    let params = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileName, // File name you want to save as in S3
      Body: data,
    };
    s3.upload(params, function (err, data) {
      if (err) {
        console.log(err);
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      try {
        fs.unlinkSync("public/images/" + fileName);
        fs.unlinkSync("public/images/" + fileName);
        fs.unlinkSync("public/images/" + fileName);
        fs.unlinkSync("public/images/" + fileName);
        fs.unlinkSync("public/images/" + fileName);
      } catch (err) {}
    });
  });
};

exports.getAll = (req, res, next) => {
  Blog.find()
    .then((documents) => {
      if (documents) {
        console.log(documents)
        res.status(200).json({
          blogs: documents,
        });
      } else {
        res.status(404).json({
          error: "Nothing was found!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: "An unknown error occured!.",
        errorMessage: error,
      });
    });
};

exports.edit = (req, res, next) => {
  const blog = {
    image: req.body.oldFileName,
    name: req.body.name,
    title: req.body.title,
    detail: req.body.detail,
  };

  if (req.file) {
    const image = req.file;
    blog.image = image.filename;
    const fileName = image.filename.substring(0, image.filename.length - 3);
    compress_images(
      tempImagePath,
      outputImagePath,
      { compress_force: false, statistic: true, autoupdate: true },
      false,
      { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
      { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
      { svg: { engine: false, command: false } },
      {
        gif: {
          engine: false,
          command: false,
        },
      },
      function (error, completed, statistic) {
        try {
          fs.unlinkSync("tempImg/" + fileName + "jpg");
          fs.unlinkSync("tempImg/" + fileName + "jpg");
          fs.unlinkSync("tempImg/" + fileName + "jpg");
          fs.unlinkSync("tempImg/" + fileName + "jpg");
          fs.unlinkSync("tempImg/" + fileName + "jpg");
          fs.unlinkSync("tempImg/" + fileName + "jpg");
          fs.unlinkSync("tempImg/" + fileName + "jpg");
          fs.unlinkSync("tempImg/" + fileName + "jpg");
          fs.unlinkSync("tempImg/" + fileName + "jpg");
          fs.unlinkSync("tempImg/" + fileName + "jpg");
          fs.unlinkSync("tempImg/" + fileName + "jpg");
          fs.unlinkSync("tempImg/" + fileName + "jpg");
          fs.unlinkSync("tempImg/" + fileName + "jpg");
          fs.unlinkSync("tempImg/" + fileName + "jpg");
          fs.unlinkSync("tempImg/" + fileName + "jpg");
          fs.unlinkSync("tempImg/" + fileName + "jpg");
          fs.unlinkSync("tempImg/" + fileName + "jpg");
          fs.unlinkSync("tempImg/" + fileName + "jpg");
          fs.unlinkSync("tempImg/" + fileName + "jpg");
          fs.unlinkSync("tempImg/" + fileName + "jpg");
          fs.unlinkSync("tempImg/" + fileName + "jpg");
        } catch (err) {}
        try {
          fs.unlinkSync("tempImg/" + fileName + "png");
          fs.unlinkSync("tempImg/" + fileName + "png");
          fs.unlinkSync("tempImg/" + fileName + "png");
          fs.unlinkSync("tempImg/" + fileName + "png");
          fs.unlinkSync("tempImg/" + fileName + "png");
          fs.unlinkSync("tempImg/" + fileName + "png");
          fs.unlinkSync("tempImg/" + fileName + "png");
          fs.unlinkSync("tempImg/" + fileName + "png");
          fs.unlinkSync("tempImg/" + fileName + "png");
          fs.unlinkSync("tempImg/" + fileName + "png");
          fs.unlinkSync("tempImg/" + fileName + "png");
          fs.unlinkSync("tempImg/" + fileName + "png");
          fs.unlinkSync("tempImg/" + fileName + "png");
          fs.unlinkSync("tempImg/" + fileName + "png");
          fs.unlinkSync("tempImg/" + fileName + "png");
          fs.unlinkSync("tempImg/" + fileName + "png");
          fs.unlinkSync("tempImg/" + fileName + "png");
          fs.unlinkSync("tempImg/" + fileName + "png");
        } catch (err) {}
        uploadFile(image.filename);
      }
    );
  }

  Blog.updateOne({ _id: req.params.id }, blog)
    .then((result) => {
      if (result.n == 0) {
        res.status(404).json({
          error: "Nothing updated!",
        });
      } else {
        res.status(201).json({
          message: "Update successfull!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: "An unknown error occured!.",
        errorMessage: error,
      });
    });
};
