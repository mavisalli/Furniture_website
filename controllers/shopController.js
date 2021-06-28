const Product = require("../models/Product");
const Category = require("../models/Category");

exports.getIndexPage = (req, res) => {
  console.log(req.session.adminID);
  res.status(200).render("index");
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





