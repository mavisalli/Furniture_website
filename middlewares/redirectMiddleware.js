module.exports = (req, res, next) => {
  if (req.session.adminID) {
    return res.redirect("/admin/adminproducts");
  }
  next();
};
