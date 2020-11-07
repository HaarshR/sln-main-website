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

const deleteFile = (fileName) => {
  let params = {
    Bucket: process.env.BUCKET_NAME,
    Key: "blog/" + fileName,
  };

  s3.deleteObject(params, function (err, data) {
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
      console.log(err);
    }
    let params = {
      Bucket: process.env.BUCKET_NAME,
      Key: "blog/" + fileName, // File name you want to save as in S3
      Body: data,
    };
    s3.upload(params, function (err, data) {
      if (err) {
        console.log(err);
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
  Blog.find()
    .then((documents) => {
      if (documents.length != 0) {
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
        error: error,
        errorMessage: "An unknown error occured!",
      });
    });
};

exports.getOne = (req, res, next) => {
  Blog.findOne({ _id: req.params.id })
    .then((document) => {
      if (document) {
        res.status(200).json({
          blog: document,
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
  const blog = new Blog({
    _id: null,
    date: new Date(),
    image: req.file.filename,
    name: req.body.name,
    title: req.body.title,
    subtitle: req.body.subtitle,
    detail: req.body.detail,
    viewCount: +0,
    comments: [],
    style: {
      backgroundColor: req.body.backgroundColor,
      primary: req.body.primary,
      secondary: req.body.secondary,
    },
  });
  console.log(blog);

  blog
    .save()
    .then(() => {
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
              fs.unlinkSync("tempImg/" + blog.image);
              fs.unlinkSync("tempImg/" + blog.image);
              fs.unlinkSync("tempImg/" + blog.image);
              fs.unlinkSync("tempImg/" + blog.image);
            } catch (err) {}
            uploadFile(blog.image);
          }
        );
      }
      res.status(201).json({
        message: "Successfully added!",
        id: "Refresh the Page",
        images: blog.image,
      });
    })
    .catch((error) => {
      try {
        fs.unlinkSync("tempImg/" + blog.image);
        fs.unlinkSync("tempImg/" + blog.image);
        fs.unlinkSync("tempImg/" + blog.image);
        fs.unlinkSync("tempImg/" + blog.image);
      } catch (err) {}
      if (
        error.errors.title &&
        error.errors.title.properties.type &&
        error.errors.title.properties.type == "unique"
      ) {
        res.status(404).json({
          error: "Error occured! This blog title already exist.",
        });
      } else {
        res.status(500).json({
          error: error,
          errorMessage: "An unknown error occured!",
        });
      }
    });
};

exports.addComment = (req, res, next) => {
  let blog;
  if (req.body.anonymous == "true") {
    blog = {
      $push: {
        comments: {
          $each: [
            {
              name: "Anonymous User",
              comment: req.body.comment,
              anonymous: req.body.anonymous,
              date: new Date(),
            },
          ],
        },
      },
    };
  } else {
    blog = {
      $push: {
        comments: {
          $each: [
            {
              name: req.body.name,
              comment: req.body.comment,
              anonymous: req.body.anonymous,
              date: new Date(),
            },
          ],
        },
      },
    };
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
        error: error,
        errorMessage: "An unknown error occured!",
      });
    });
};

exports.edit = (req, res, next) => {
  const blog = {
    image: req.body.oldFileName,
    name: req.body.name,
    title: req.body.title,
    subtitle: req.body.subtitle,
    detail: req.body.detail,
    style: {
      backgroundColor: req.body.backgroundColor,
      primary: req.body.primary,
      secondary: req.body.secondary,
    },
  };

  if (req.file) {
    const image = req.file;
    blog.image = image.filename;
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
        if (completed) {
          try {
            fs.unlinkSync("tempImg/" + image.filename);
            fs.unlinkSync("tempImg/" + image.filename);
            fs.unlinkSync("tempImg/" + image.filename);
            fs.unlinkSync("tempImg/" + image.filename);
          } catch (err) {}
          try {
            deleteFile(req.body.oldFileName);
            uploadFile(image.filename);
          } catch (err) {}
        }
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
        error: error,
        errorMessage: "An unknown error occured!",
      });
    });
};

exports.deleteOne = (req, res, next) => {
  Blog.deleteOne({ _id: req.params.id })
    .then((result) => {
      deleteFile(req.params.image);
      if (result.n > 0) {
        res.status(200).json({ message: "Successfully removed!" });
      } else {
        res.status(404).json({
          error: "Nothing was deleted.",
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
