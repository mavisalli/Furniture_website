const Product = require("../models/Product");
const fs = require("fs");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).render("adminproducts", {
      products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.postAddProduct = async (req, res) => {
  const uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname + "/../public/uploads/" + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Product.create({
      ...req.body,
      image: "/uploads/" + uploadeImage.name,
    });
    res.status(201).redirect("/products");
  });
};

exports.getAddProduct = async (req, res) => {
  res.status(200).render("add-product");
};

exports.getEditProduct = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  res.status(201).render("edit-product", {
    product,
  });
};

exports.postEditProduct = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  product.name = req.body.name;
  product.size = req.body.size;
  product.description = req.body.description;
  product.moreInfo = req.body.moreInfo;
  product.color = req.body.color;
  await product.save();
  res.status(200).redirect(`/admin/adminproducts`);
};

exports.deleteProduct = async (req, res) => {

  const product = await Product.findOne({ slug: req.params.slug });
  let deletedImage = __dirname + '/../public' + product.image;
  fs.unlinkSync(deletedImage);
  await Product.findOneAndRemove({slug : req.params.slug});
  res.status(200).redirect('/admin/adminproducts');

};