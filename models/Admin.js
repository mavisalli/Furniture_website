const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
      type: String,
      required: true
  }
});

AdminSchema.pre('save', function (next){
  const admin = this;
  bcrypt.hash(admin.password, 10, (error, hash) => {
      admin.password = hash;
      next();
  })
})

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;