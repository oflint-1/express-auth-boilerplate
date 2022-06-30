const User = require("../models/user");
const passport = require("passport");
const bcrypt = require("bcryptjs");

// Login function
async function login(req, res) {
  res.redirect("/api/auth/status");
}

async function signup(req, res, next) {
  // generate salt
  const salt = bcrypt.genSaltSync();
  // generate hash using password and salt
  const hash = bcrypt.hashSync(req.body.password, salt);

  // create new user document using username and hash
  const newUser = new User({
    username: req.body.username,
    password: hash,
  });

  // save user to database
  const savedUser = await newUser.save().catch((err) => console.log(err));

  //If user saved correctly, login user
  if (savedUser) {
    // authenticate user
    req.login(
      { id: savedUser._id, username: req.body.username },
      function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/api/auth/status");
      }
    );
  } else {
    // if no user returned, return a 400 error (bad request)
    res.status(400).send();
  }
}

async function status(req, res) {
  if (req.isAuthenticated()) {
    res.send("logged in");
  } else {
    res.send("logged out");
  }
}
async function logout(req, res) {
  if (req.isAuthenticated()) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/api/auth/status");
    });
  } else {
    res.status(401).send({ success: false });
  }
}
module.exports = {
  login,
  signup,
  status,
  logout,
};
