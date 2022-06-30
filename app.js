const express = require("express");
const mongoose = require("mongoose"); // Imports Mongoose which is used to link to MongoDB

const passport = require("passport");
const session = require("express-session");

const app = express();
const port = 3000;

app.use(express.json());
app.keys = ["super-secret-key"]; // Sets application key (will be secure if used in production)
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
); // Tells app to use sessions

// authentication
require("./auth"); // Fetches auth file functinos
app.use(passport.initialize()); // Intialiases passport authentication
app.use(passport.session()); // Initialises passport sessions

mongoose.connect(`mongodb://database:27017/test`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // Connects to database
var db = mongoose.connection; // Stores connection
db.on("error", console.error.bind(console, "connection error:")); // Logs any errors

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const routes = require("./routes/index");
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
