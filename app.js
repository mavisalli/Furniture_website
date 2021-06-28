const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require('connect-mongo');

const shopRoute = require("./routes/shopRoute");
const adminRoute = require("./routes/adminRoute");
const authRoute = require("./routes/authRoute");

const app = express();

// Connect DB
mongoose
  .connect("mongodb://localhost/nilay_mobilya_mongodb-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected Successfully");
  });

// TEMPLATE ENGINE
app.set("view engine", "ejs");

//GLOBAL VARIABLE
global.adminIN = null;

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);
app.use(
  session({
    //session middleware
    secret: "my_keyboard_cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/nilay_mobilya_mongodb-db' })
  })
);

//ROUTES
app.use("*", (req, res, next) => {
  adminIN = req.session.adminID;
  next();
});

app.use("/", shopRoute);
app.use("/admin", adminRoute);
app.use("/users", authRoute);

const port = 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
