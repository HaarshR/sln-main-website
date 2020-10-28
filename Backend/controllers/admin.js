const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const Admin = require("../models/admin");

exports.getAdmin = (req, res, next) => {};

exports.login = (req, res, next) => {
  let fetchedUser;
  Admin.findOne({ email: req.body.email })
    .then((admin) => {
      if (!admin) {
        return res.status(404).json({
          errorMessage: "Authentication failed! Wrong email address.",
        });
      }
      fetchedUser = admin;
      return bcrypt.compare(req.body.password, admin.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          errorMessage: "Authentication failed! The password is incorrect.",
        });
      }
      const token = jwt.sign(
        {
          adminID: fetchedUser._id,
          adminEMAIL: fetchedUser.email,
        },
        process.env.JTW_KEY
      );

      let transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
        },
      });
      let mailOptions = {
        from: "Sov Lanatir Server",
        to: process.env.SOVLANATIR_EMAIL,
        subject: "Admin account accessed!",
        text: "Admin account accessed!",
        html: `Hey there!<br /><br />
            Someone just logged into Sov Lanatir admin account. If its you or someone you know, please ignore this email!
            <br />
            But if you find anything suspicious, please change the password right now!`,
      };
      transport.sendMail(mailOptions, (error, info) => {});
      return res.status(200).json({
        token: token,
        adminID: fetchedUser._id,
        adminEMAIL: fetchedUser.email,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "An unknown error occured!",
        errorMessage: error,
      });
    });
};

exports.updatePassword = (req, res, next) => {
  let user;
  if (req.body.newPassword == "") {
    user = {
      profilePic: null,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      email: req.body.email,
      emailSubscribe: req.body.emailSubscribe,
      phoneNum: req.body.mobileNum,
      address: {
        street1: req.body.street1,
        street2: req.body.street2,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
      },
      $push: {
        editsDate: {
          $each: [new Date()],
        },
      },
    };
  } else {
    bcrypt.hash(req.body.newPassword, 10).then((hash) => {
      user = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        emailSubscribe: req.body.emailSubscribe,
        password: hash,
        phoneNum: req.body.mobileNum,
        address: {
          street1: req.body.street1,
          street2: req.body.street2,
          city: req.body.city,
          state: req.body.state,
          zipCode: req.body.zipCode,
        },
        $push: {
          editsDate: {
            $each: [new Date()],
          },
        },
      };
    });
  }
  if (req.file) {
    user.profilePic = req.file.filename;
    const fileName = req.file.filename.substring(
      0,
      req.file.filename.length - 3
    );
    try {
      fs.unlinkSync("public/profilePictures/" + fileName + "jpg");
      fs.unlinkSync("public/profilePictures/" + fileName + "jpg");
      fs.unlinkSync("public/profilePictures/" + fileName + "jpg");
      fs.unlinkSync("public/profilePictures/" + fileName + "jpg");
      fs.unlinkSync("public/profilePictures/" + fileName + "jpg");
    } catch {}
    try {
      fs.unlinkSync("public/profilePictures/" + fileName + "png");
      fs.unlinkSync("public/profilePictures/" + fileName + "png");
      fs.unlinkSync("public/profilePictures/" + fileName + "png");
      fs.unlinkSync("public/profilePictures/" + fileName + "png");
      fs.unlinkSync("public/profilePictures/" + fileName + "png");
    } catch {}
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
          fs.unlinkSync("tempImg/" + req.file.filename);
          fs.unlinkSync("tempImg/" + req.file.filename);
          fs.unlinkSync("tempImg/" + req.file.filename);
          fs.unlinkSync("tempImg/" + req.file.filename);
          fs.unlinkSync("tempImg/" + req.file.filename);
        } catch {}
      }
    );
  }
  User.updateOne({ _id: req.params.id }, user)
    .then((result) => {
      if (result.n == 0) {
        res.status(404).json({
          error: "No accommodation was edited!",
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
