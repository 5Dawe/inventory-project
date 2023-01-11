require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = 20001;
const bodyParser = require("body-parser");


const Item = require("./models/Item");
const User = require("./models/User");


//controllers
const itemController = require("./controllers/item");
const userController = require("./controllers/user");

//session
const expressSession = require("express-session");
app.use(expressSession({ secret: 'foo barr', saveUninitialized: true, resave: false, cookie: { expires: new Date(253402300000000) } }))


//session middleware
global.user = false;
app.use("*", async (req, res, next) => {
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
  }
  next();
})


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { WEB_PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.error("Connection Error");
  process.exit();
})



//middleware route lockdown
const authMiddleware = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (!user) {
    return res.redirect('/');
  }
  next()
}

//routes


app.get("/", (req, res) => {
  res.render("index");
});


app.get("/items", authMiddleware, itemController.lists);

app.get("/items/delete/:id", itemController.delete);

app.get("/items/update/:id", itemController.edit);
app.post("/items/update/:id", itemController.update);

app.get("/create-item", authMiddleware, (req, res) => {
  res.render("create-item", {errors: {} })
});

app.post("/create-item", itemController.create);

app.get("/create-user", authMiddleware, (req, res) => {
  res.render("create-user", {errors: {} })
});

app.post("/create-user", userController.create);


app.get("/login", (req, res) => {
  res.render('login', { errors: {} })
});
app.post("/login", userController.login);

app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});


