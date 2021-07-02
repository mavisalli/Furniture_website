const Product = require("../models/Product");
const Category = require("../models/Category");
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
    req.flash("success", "ürün sisteme eklendi");
    res.status(201).redirect("/admin/adminproducts");
  });
};

exports.getAddProduct = async (req, res) => {
  const categories = await Category.find({});
  res.status(200).render("add-product", {
    categories
  });
};



exports.getEditProduct = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  const categories = await Category.find({});

  res.status(201).render("edit-product", {
    product,
    categories
  });
};



exports.postEditProduct = async (req, res) => {

  const product = await Product.findOne({ slug: req.params.slug });
  let oldImage = product.image.slice(9);

  if(req.files){
    const newImage = req.files.image;
    let delImage = __dirname + '/../public/uploads/' + oldImage;
    fs.unlinkSync(delImage);
    let uploadPath = __dirname + '/../public/uploads/' + newImage.name;
    newImage.mv(uploadPath);
    product.image = '/uploads/' + newImage.name;
  } else {
    product.image = '/uploads/' + oldImage.name;
  }
  


  product.name = req.body.name;
  product.size = req.body.size;
  product.description = req.body.description;
  product.category = req.body.category;
  product.moreInfo = req.body.moreInfo;
  product.color = req.body.color;
  await product.save();
  req.flash("success", `${product.name} güncellendi`);
  res.status(200).redirect(`/admin/adminproducts`);
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  let deletedImage = __dirname + "/../public" + product.image;
  fs.unlinkSync(deletedImage);
  await Product.findOneAndRemove({ slug: req.params.slug });
  req.flash("success", `${product.name} silindi !`);
  res.status(200).redirect("/admin/adminproducts");
};

exports.getAddCategory = async (req, res) => {
  res.status(200).render("add-category");
};

exports.postAddCategory = async (req, res) => {
  await Category.create({
    name: req.body.name,
  });

  res.status(201).redirect("/admin/categories");
};

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find({});

  res.status(200).render("categories", {
    categories,
  });
};
