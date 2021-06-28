const express = require('express')
const authController = require('../controllers/authController');




const router = express.Router();

router.route('/signup').post(authController.createAdmin); // http://localhost:3000/users/signup
router.route('/loginpage').post(authController.loginAdmin);
router.route('/logout').get(authController.logoutAdmin);



module.exports = router;