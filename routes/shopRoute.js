const express = require("express");

const shopController = require("../controllers/shopController");


const router = express.Router();

router.route("/").get(shopController.getIndexPage);
router.route("/login").get(shopController.getLoginPage);
router.route("/products").get(shopController.getAllProducts);
router.route("/products/:slug").get(shopController.getProduct);






module.exports = router;