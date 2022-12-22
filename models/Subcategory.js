const mongoose = require("mongoose")

const subcategorySchema = new mongoose.Schema({
title:{
    type: String,
    required: true
},
description:{
    type: String,
    required: true
},
category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
},
products:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
}],
image:{
    type: Object
}
})

module.exports = mongoose.model("Subcategory", subcategorySchema)