const express = require("express");

const shopController = require("../controllers/shopController");
const redirectMiddleware = require("../middlewares/redirectMiddleware");


const router = express.Router();

router.route("/").get(shopController.getIndexPage);
router.route("/login").get(redirectMiddleware, shopController.getLoginPage);
router.route("/products").get(shopController.getAllProducts);
router.route("/products/:slug").get(shopController.getProduct);






module.exports = router;