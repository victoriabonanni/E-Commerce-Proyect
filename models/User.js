const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    maxlength:20,
    minlength:2,   
    required: true,                        // el required significa que el user si o si lo tiene que ingresar por el body
  },
  apellido: {
    type: String,
    maxlength:20,
    minlength:2,   
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type: Number,        // con el default se pone automaticamente cuando creo el objeto, el 0 van a ser todos los usuarios creados
    default: 0,          // 0 user normal - 1 user Admin - 2 user Pro
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