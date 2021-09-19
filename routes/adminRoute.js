const express = require("express");


const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/adminproducts").get(authMiddleware, adminController.getProducts);
router
  .route("/add-product")
  .post(authMiddleware, adminController.postAddProduct);
router.route("/add-product").get(authMiddleware, adminController.getAddProduct);
router
  .route("/edit-product/:slug")
  .put(authMiddleware, adminController.postEditProduct);
router
  .route("/edit-product/:slug")
  .get(authMiddleware, adminController.getEditProduct);
router
  .route("/adminproducts/:slug")
  .delete(authMiddleware, adminController.deleteProduct);

router
  .route("/add-category")
  .get(authMiddleware, adminController.getAddCategory);
router
  .route("/add-category")
  .post(authMiddleware, adminController.postAddCategory);
router
  .route("/categories")
  .get(authMiddleware, adminController.getAllCategories);

module.exports = router;
