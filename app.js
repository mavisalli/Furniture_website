const express = require("express");
const ejs = require('ejs');
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

const shopRoute = require("./routes/shopRoute");
const adminRoute = require("./routes/adminRoute");

const app = express();


// Connect DB
mongoose.connect('mongodb://localhost/nilay_mobilya_mongodb-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=> {
  console.log("DB Connected Successfully")
});

// TEMPLATE ENGINE
app.set("view engine", "ejs");


// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload()); 
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

//ROUTES
app.use("/", shopRoute);
app.use("/admin", adminRoute);





const port = 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});