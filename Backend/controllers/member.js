// IMPORTS THE MODELS
const Member = require("../models/member");

const fs = require("fs");
const nodemailer = require("nodemailer");

const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEYID,
  secretAccessKey: process.env.AWS_SECRETKEY,
});

const Transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const deleteFile = (fileName) => {
  let params = {
    Bucket: process.env.BUCKET_NAME,
    Key: "CVs/" + fileName,
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
  console.log(fileName);
  fs.readFile("tempImg/" + fileName, (err, data) => {
    if (err) {
      console.log(err);
    }
    let params = {
      Bucket: process.env.BUCKET_NAME,
      Key: "CVs/" + fileName, // File name you want to save as in S3
      Body: data,
    };
    s3.upload(params, function (err, data) {
      if (err) {
        console.log(err);
      }
      try {
        fs.unlinkSync("tempImg/" + fileName);
        fs.unlinkSync("tempImg/" + fileName);
        fs.unlinkSync("tempImg/" + fileName);
        fs.unlinkSync("tempImg/" + fileName);
        fs.unlinkSync("tempImg/" + fileName);
      } catch (err) {}
      console.log(`CV uploaded successfully. ${data.Location}`);
    });
  });
};

const mail = (email, subject, content) => {
  let mailOptions = {
    from: '"Sov Lanatir" <noreply@sovlanatir.com>',
    to: email,
    subject: subject,
    text: content,
    html: "",
  };
  Transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      error++;
    }
  });
};

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

  let member;
  if (req.params.memberType == "subscriber") {
    member = Member.find({
      membershipType: "subscriber",
    });
  } else if (req.params.memberType == "executive") {
    member = Member.find({ membershipType: "executive" });
  } else if (req.params.memberType == "regular") {
    member = Member.find({ membershipType: "regular" });
  } else if (req.params.memberType == "allMembers") {
    member = Member.find({
      $or: [{ membershipType: "executive" }, { membershipType: "regular" }],
    });
  } else if (req.params.memberType == "all") {
    member = Member.find();
  }
  member
    .then((documents) => {
      if (documents.length != 0) {
        let error = 0;
        documents.forEach((receiver) => {
          let mailOptions = {
            from: '"Sov Lanatir" <noreply@sovlanatir.com>',
            to: receiver.email,
            subject: subject,
            html: mail,
          };
          Transport.sendMail(mailOptions, (error, info) => {
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

exports.addOther = (req, res, next) => {
  const member = new Member({
    _id: null,
    dor: new Date(),
    firstName: null,
    lastName: null,
    dob: null,
    phoneNumber: null,
    social: null,
    email: req.body.email,
    educInstitution: null,
    fieldOfStudy: null,
    questions: [],
    answers: [],
    department: [],
    membershipType: "subscriber",
    cv: null,
  });

  member
    .save()
    .then(() => {
      mail(req.body.email, "Membership Approved", "You have successfully registered your email, You will now receive emails from us!");
      res.status(201).json({
        message: "Successfully Registered!",
      });
    })
    .catch((error) => {
      console.log(error);
      if (
        error.errors.email &&
        error.errors.email.properties.type &&
        error.errors.email.properties.type == "unique"
      ) {
        res.status(404).json({
          errorMessage: "Error occured! Email already registered.",
        });
      } else {
        res.status(500).json({
          error: error,
          errorMessage: "An unknown error occured!",
        });
      }
    });
};

exports.addRegular = (req, res, next) => {
  const member = new Member({
    _id: null,
    dor: new Date(),
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    dob: new Date(
      req.body.dob.year + "-" + req.body.dob.month + "-" + req.body.dob.day
    ),
    phoneNumber: req.body.phoneNumber,
    social: req.body.social,
    email: req.body.email,
    educInstitution: req.body.educInstitution,
    fieldOfStudy: req.body.fieldOfStudy,
    questions: [
      "How did you get to know about Sov Lanatir?",
      "Why do you want to join us?",
      "What is your biggest achievement?",
      "Have you been in any other organisations? if yes, what was your role?",
      "What are you already doing as an individual, to save Nature?",
      "if nature contained all answers of the Universe, what would you ask her?",
    ],
    answers: [
      req.body.question1,
      req.body.question2,
      req.body.question3,
      req.body.question4,
      req.body.question5,
      req.body.question6,
    ],
    department: req.body.department.split(','),
    membershipType: "regular",
    cv: null,
  });

  member
    .save()
    .then(() => {
      mail(req.body.email, "Regular Membership Approved", "You have successfully been registered as our regular member!");
      res.status(201).json({
        message: "Successfully Registered!",
      });
    })
    .catch((error) => {
      if (
        error.errors.email &&
        error.errors.email.properties.type &&
        error.errors.email.properties.type == "unique"
      ) {
        res.status(404).json({
          errorMessage: "Error occured! Email already registered.",
        });
      } else {
        res.status(500).json({
          error: error,
          errorMessage: "An unknown error occured!",
        });
      }
    });
};

exports.addExecutive = (req, res, next) => {
  console.log(req.body);
  console.log(req.body.dob);
  const member = new Member({
    _id: null,
    dor: new Date(),
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    dob: req.body.dob,
    phoneNumber: req.body.phoneNumber,
    social: req.body.social,
    email: req.body.email,
    educInstitution: req.body.educInstitution,
    fieldOfStudy: req.body.fieldOfStudy,
    questions: [
      "How did you get to know about Sov Lanatir?",
      "Why do you want to join us?",
      "What is your biggest achievement?",
      "Have you been in any other organisations? if yes, what was your role?",
      "What are you already doing as an individual, to save Nature?",
      "if nature contained all answers of the Universe, what would you ask her?",
    ],
    answers: [
      req.body.question1,
      req.body.question2,
      req.body.question3,
      req.body.question4,
      req.body.question5,
      req.body.question6,
    ],
    department: req.body.departments.join(','),
    membershipType: "executive",
    cv: req.file.filename,
  });

  member
    .save()
    .then(() => {
      uploadFile(req.file.filename);
      mail(req.body.email, "Executive Membership Approved", "You have successfully been registered as our executive member!");
      res.status(201).json({
        message: "Successfully Registered!",
      });
    })
    .catch((error) => {
      console.log(error);
      if (
        error.errors.email &&
        error.errors.email.properties.type &&
        error.errors.email.properties.type == "unique"
      ) {
        res.status(404).json({
          errorMessage: "Error occured! Email already registered.",
        });
      } else {
        res.status(500).json({
          error: error,
          errorMessage: "An unknown error occured!",
        });
      }
    });
};

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
