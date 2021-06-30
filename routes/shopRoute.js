const express = require("express");

const shopController = require("../controllers/shopController");
const redirectMiddleware = require("../middlewares/redirectMiddleware");


const router = express.Router();

router.route("/").get(shopController.getIndexPage);
router.route("/about-us").get(shopController.getAboutPage);
router.route("/store").get(shopController.getStorePage);
router.route("/contact").get(shopController.getContactPage);
router.route("/login").get(redirectMiddleware, shopController.getLoginPage);
router.route("/products").get(shopController.getAllProducts);
router.route("/products/:slug").get(shopController.getProduct);
router.route("/contacts").post(shopController.sendMail);






module.exports = router;