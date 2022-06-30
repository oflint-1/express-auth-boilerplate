const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const bcrypt = require("bcryptjs");

const options = {};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(options, (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (!user) return done(null, false);
      if (comparePass(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}
