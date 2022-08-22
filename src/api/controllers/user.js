const bcrypt = require("bcrypt");

const User = require("../models/user.js");

//todo    to create resources
exports.signup = (req, res, next) => {
  // console.log("here");
  // console.log(req.body);
  User.find({ email: req.body.email })
    .exec()
    .then((result) => {
      
      if (result.length >= 1) {
        console.log("then ashutosh");
        return res.status(409).json({
          Message: "Email already exists.",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          if (err) {
            res.status(500).json({
              error: err.message,
            });
          } else {
            const user = new User({
              email: req.body.email.toLowerCase(),
              password: hashedPassword,
            });
            user.save().then((createdUser) => {
              console.log("save reached");
              return res.status(201).json({
                Message: "successfully added a new user.",
                createdUser,
              });
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.login = (req, res, next) => {
  User.find({ email: req.body.email.toLowerCase() })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth Failed",
        });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (result == false) {
          return res.status(401).json({
            message: "Auth Failed",
          });
        } else {
          return res.status(200).json({
            message: "Auth successful",
            accessLevel: user[0].accessLevel,
            user: user[0],
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// //todo     to fetch or read resources

//!   get all users
exports.get_all_user = (req, res, next) => {
  User.find()
    .exec()
    .then((users) => {
      res.status(200).json({
        length: users.length,
        users,
      });
    })
    .catch((err) => console.log(err));
};

//!    get single user
exports.get_single_user = (req, res, next) => {
  console.log("here");
  User.find({ _id: req.params.userID })
    .exec()
    .then((result) => {
      if (result.length < 1) {
        return res.status(400).json({
          message: "User not Found",
        });
      }

      return res.status(200).json({
        user: result[0],
      });
    })
    .catch((err) => console.log(err));
};

//todo    patch resources

exports.update_user = (req, res, next) => {
  const id = req.params.userID;
  const updateFields = {};

  for (let [key, value] of Object.entries(req.body)) {
    updateFields[key] = value;
  }

  for (const key of Object.keys(updateFields)) {
    if (key == "password") {
      bcrypt.hash(updateFields[key], 10, (err, hashedPassword) => {
        if (err) {
          res.status(500).json({
            message: err.message,
          });
        } else {
          updateFields[key] = hashedPassword;

          User.update({ _id: id }, { $set: updateFields })
            .exec()
            .then((result) => {
              return res.status(200).json({
                message: "User Updated.",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  }
};

// todo     Delete resources

//!   delete single resources

exports.delete_user = (req, res, next) => {
  const id = req.params.userID;
  User.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({ message: "User Deleted" });
    })
    .catch((err) => console.log(err));
};
