const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength:20,
    minlength:2,   
    required: true,                        // el required significa que el user si o si lo tiene que ingresar por el body
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type: Number,        // con el default se pone automaticamente cuando creo el objeto, el 0 van a ser todos los usuarios creados
    default: 0,          // 0 user normal - 1 user Pro - 2 user Admin
  },
  // role:{
  //   type: String,
  //   enum:["user", "userpro"]
  // },
  cart: {
    type: Array,
    default: []
  },

}, {timestamps: true});

module.exports = mongoose.model("User", userSchema)