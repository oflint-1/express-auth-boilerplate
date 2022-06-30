const express = require("express");
const router = express.Router();
const passport = require("passport");
const Ctrl = require("../controllers/auth");

// define the home page route
router.get("/", (req, res) => {
  res.send("Hello auth!");
});
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  Ctrl.login
);
router.post("/signup", Ctrl.signup);
router.get("/status", Ctrl.status);
router.get("/logout", Ctrl.logout);

module.exports = router;
