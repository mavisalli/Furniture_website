const express = require("express");

const adminController = require("../controllers/adminController");


const router = express.Router();

router.route("/adminproducts").get(adminController.getProducts);
router.route("/add-product").post(adminController.postAddProduct);
router.route("/add-product").get(adminController.getAddProduct);
router.route("/edit-product/:slug").put(adminController.postEditProduct);
router.route("/edit-product/:slug").get(adminController.getEditProduct);
router.route("/adminproducts/:slug").delete(adminController.deleteProduct);

router.route("/add-category").get(adminController.getAddCategory);
router.route("/add-category").post(adminController.postAddCategory);
router.route("/categories").get(adminController.getAllCategories);

module.exports = router;