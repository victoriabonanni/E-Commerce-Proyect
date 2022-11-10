const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    maxlength:20,
    minlength:2,   
    require: true,
  },
  apellido: {
    type: String,
    maxlength:20,
    minlength:2,   
    require: true,
  },
  mail: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  cart: {
    type: Array,
  },
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema)