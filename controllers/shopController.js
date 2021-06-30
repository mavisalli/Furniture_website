const nodemailer = require("nodemailer");
const Product = require("../models/Product");
const Category = require("../models/Category");

exports.getIndexPage = (req, res) => {
  console.log(req.session.adminID);
  res.status(200).render("index");
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about-us");
};


exports.getStorePage = (req, res) => {
  res.status(200).render("store");
};

exports.getContactPage = (req, res) => {
  res.status(200).render("contact");
};


exports.getLoginPage = (req, res) => {
  res.status(200).render('login');
};



exports.getAllProducts = async (req, res) => {
  try {

    const categories = await Category.find();
    
    const categorySlug = req.query.categories; 
    const category = await Category.findOne({slug: categorySlug});  // parametreden gelen category ismini buluyoruz.

    let filter = {}; //ileride search bölümünden de category quwry'si olusturcagımız icin bos bir filter olusturduk.

    if(categorySlug) {
      filter = {category: category._id} //mesela category._id si web design'ın objectId sine esit olanları filtrele.
    }

    
    const products = await Product.find(filter).sort("-createdAt"); 

    

    res.status(200).render("products", {
      products,
      categories
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};



exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    res.status(200).render("single-product", {
      product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};


exports.sendMail = async (req, res) => {

  try {

  
  
  const outputMessage = `
  <h1>Mail Details</h1>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
  <h1>Message</h1>
  <p>${req.body.message}</p>
  
  `

  
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: "mavi.baris96@gmail.com", 
      pass: "vjbvqwapgdoeloco", 
    },
  });

 
  let info = await transporter.sendMail({
    from: '"Nilay Mobilya Contact Form" <mavi.baris96@gmail.com>',
    to: "salliseyhan2@gmail.com", 
    subject: "Nilay Mobilya Contact Form New Message", 
    html: outputMessage, 
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  req.flash("success", "We received your message successfully");
  res.status(200).redirect("/contact");

 } catch (err) {
   req.flash("error", "Something Happened !")
   res.status(400).redirect("/contact");
 }
};





