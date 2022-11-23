const mongoose = require("mongoose")

const categorySchema  = new mongoose.Schema({
    title:{
        type: String,
        maxlength:50,
        minlength:3,    
        require: true
    },
    subcategory:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory"
    }]
})

module.exports = mongoose.model("Category", categorySchema)