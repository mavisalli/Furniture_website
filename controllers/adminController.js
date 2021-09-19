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
  const product = new Product({
    name: req.body.name,
    size: req.body.size,
    description: req.body.description,
    category: req.body.category,
    moreInfo: req.body.moreInfo,
    color: req.body.color,
  });

  const uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

  const images = [];

  req.files.image = !req.files.image.length
    ? [req.files.image]
    : req.files.image;
  for (let i = 0; i < req.files.image.length; i++) {
    const image = req.files.image[i];
    let uploadPath = __dirname + "/../public/uploads/" + image.name;

    await new Promise((resolve) => {
      image.mv(uploadPath, (err) => {
        if (err) throw err;
        console.log(image);
        if (!err) images.push(`uploads/${image.name}`);
        resolve(true);
      });
    });
  }
  product.images = images;
  await product.save();

  req.flash("success", "ürün sisteme eklendi");
  res.status(201).redirect("/admin/adminproducts");
};

exports.getAddProduct = async (req, res) => {
  const categories = await Category.find({});
  res.status(200).render("add-product", {
    categories,
  });
};

exports.getEditProduct = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  const categories = await Category.find({}).lean();

  res.status(201).render("edit-product", {
    product,
    categories,
  });
};

exports.postEditProduct = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  let editedImages = JSON.parse(req.body.editedImages) || [];

  if (editedImages.length) editedImages = editedImages.map((i) => i.slice(1));

  const uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

  const images = [];

  if (req.files) {
    req.files.image = !req.files.image.length
      ? [req.files.image]
      : req.files.image;
    for (let i = 0; i < req.files.image.length; i++) {
      const image = req.files.image[i];
      let uploadPath = __dirname + "/../public/uploads/" + image.name;

      await new Promise((resolve) => {
        image.mv(uploadPath, (err) => {
          if (err) throw err;
          console.log(image);
          if (!err) images.push(`uploads/${image.name}`);
          resolve(true);
        });
      });
    }
  }
  product.images = [...editedImages, ...images];

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
  const images = product.images;
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    let deletedImage = __dirname + "/../public/" + image;
    if (fs.existsSync(deletedImage)) fs.unlinkSync(deletedImage);
  }

  await product.delete();
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
