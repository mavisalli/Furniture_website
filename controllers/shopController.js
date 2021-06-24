const Product = require("../models/Product");

exports.getIndexPage = (req, res) => {
  res.status(200).render("index");
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).render("products", {
      products,
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
