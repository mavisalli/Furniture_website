const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");


exports.createAdmin = async (req, res) => {
  const admin = await Admin.create(req.body);

  res.status(201).json({
    status: "success",
    admin
  });
};


exports.loginAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;

    await Admin.findOne({ name }, (err, admin) => {
      if (admin) {
        bcrypt.compare(password, admin.password, (err, same) => {

          if (same) {
            // USER SESSION
            req.session.adminID = admin._id;
            res.status(200).redirect('/admin/adminproducts');
          } else {
            res.status(400).redirect('/login');
          }

        });
      } else {
        res.status(400).redirect('/login');
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    });
  }
};


exports.logoutAdmin = (req, res) => {
  req.session.destroy(()=> {
    res.redirect('/');
  })
}