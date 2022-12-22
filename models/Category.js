const mongoose = require("mongoose")

const categorySchema  = new mongoose.Schema({
    title:{
        type: String,
        maxlength:50,
        minlength:3,    
        require: true
    },
    description:{
        type: String
    },
    image:{
        type: Object
       },
    subcategory:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory"
    }],
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
})

module.exports = mongoose.model("Category", categorySchema)