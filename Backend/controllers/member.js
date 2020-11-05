// IMPORTS THE MODELS
const Member = require("../models/member");

const compress_images = require("compress-images");
const fs = require("fs");
const nodemailer = require("nodemailer");

const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEYID,
  secretAccessKey: process.env.AWS_SECRETKEY,
});

const deleteFile = (fileName) => {
  let params = {
    Bucket: process.env.BUCKET_NAME,
    Key: "members/" + fileName,
  };

  s3.deleteObject(params, function (err, data) {
    if (err) {
      console.log(err);
    }
    console.log(`Successfully deleted file from bucket`);
  });
};

// const uploadFile = (fileName, eventName) => {
//   // Read content from the file
//   fs.readFile("public/images/" + fileName, (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     let params = {
//       Bucket: process.env.BUCKET_NAME,
//       Key: "event/" + eventName.split(" ").join("-") + "/" + fileName, // File name you want to save as in S3
//       Body: data,
//     };
//     s3.upload(params, function (err, data) {
//       if (err) {
//         console.log(err);
//       }
//       try {
//         fs.unlinkSync("public/images/" + fileName);
//         fs.unlinkSync("public/images/" + fileName);
//         fs.unlinkSync("public/images/" + fileName);
//         fs.unlinkSync("public/images/" + fileName);
//         fs.unlinkSync("public/images/" + fileName);
//       } catch (err) {}
//       console.log(`Image uploaded successfully. ${data.Location}`);
//     });
//   });
// };

exports.getAll = (req, res, next) => {
  Member.find({ membershipType: req.params.memberType })
    .then((documents) => {
      if (documents.length != 0) {
        res.status(200).json({
          members: documents,
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

exports.sendEmail = (req, res, next) => {
  let subject = req.body.subject;
  let mail = req.body.email;
  Member.find({ membershipType: req.params.memberType })
    .then((documents) => {
      if (documents.length != 0) {
        let error = 0;
        let emailList = [];
        emailList.push("husseinaltaaf@outlook.com");
        emailList.push("yhrambhojun@student.udm.ac.mu");
        emailList.push("sdmamodesaeb@student.udm.ac.mu");
        emailList.push("vhakloo@student.udm.ac.mu");
        emailList.push("altaafhamod@hotmail.com");
        emailList.push("mahamod@student.udm.ac.mu");
        emailList.push("yhrambhojun@student.udm.ac.mu");
        emailList.push("sdmamodesaeb@student.udm.ac.mu");
        emailList.push("vhakloo@student.udm.ac.mu");
        emailList.push("altaafhamod@hotmail.com");
        emailList.push("mahamod@student.udm.ac.mu");
        emailList.forEach((receiver) => {
          let transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
              user: process.env.NODEMAILER_USER,
              pass: process.env.NODEMAILER_PASS,
            },
          });
          let mailOptions = {
            from: '"Sov Lanatir" <noreply@sovlanatir.com>',
            to: receiver,
            subject: subject,
            html: mail,
          };
          transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              error++;
            }
          });
        });
        res.status(200).json({
          message: "Email sent successfully!",
        });
      } else {
        res.status(404).json({
          error: "No emails were sent since no user was found!",
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

// exports.addOne = (req, res, next) => {
//   const event = new Event({
//     _id: null,
//     date: req.body.date,
//     logo: req.file.filename,
//     images: [],
//     name: req.body.name,
//     description: req.body.description,
//     departmentName: req.body.departmentName,
//     location: req.body.location,
//   });

//   event
//     .save()
//     .then(() => {
//       if (req.file) {
//         compress_images(
//           tempImagePath,
//           outputImagePath,
//           { compress_force: false, statistic: true, autoupdate: true },
//           false,
//           { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
//           {
//             png: {
//               engine: "pngquant",
//               command: ["--quality=20-50", "-o"],
//             },
//           },
//           { svg: { engine: false, command: false } },
//           {
//             gif: {
//               engine: false,
//               command: false,
//             },
//           },
//           function (error, completed, statistic) {
//             try {
//               fs.unlinkSync("tempImg/" + event.logo);
//               fs.unlinkSync("tempImg/" + event.logo);
//               fs.unlinkSync("tempImg/" + event.logo);
//               fs.unlinkSync("tempImg/" + event.logo);
//             } catch (err) {}
//             uploadFile(event.logo, event.name);
//           }
//         );
//       }
//       res.status(201).json({
//         message: "Successfully added!",
//         id: "Refresh the Page",
//         images: event.logo,
//       });
//     })
//     .catch((error) => {
//       try {
//         fs.unlinkSync("tempImg/" + event.logo);
//         fs.unlinkSync("tempImg/" + event.logo);
//         fs.unlinkSync("tempImg/" + event.logo);
//         fs.unlinkSync("tempImg/" + event.logo);
//       } catch (err) {}
//       if (
//         error.errors.title &&
//         error.errors.title.properties.type &&
//         error.errors.title.properties.type == "unique"
//       ) {
//         res.status(404).json({
//           error: "Error occured! This event already exist.",
//         });
//       } else {
//         res.status(500).json({
//           error: error,
//           errorMessage: "An unknown error occured!",
//         });
//       }
//     });
// };

exports.deleteOne = (req, res, next) => {
  Member.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.n > 0) {
        deleteFile(req.params.name);
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
