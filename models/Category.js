const mongoose = require("mongoose")

const categorySchema  = new mongoose.Schema({
    title:{
        type: String,
        maxlength:50,
        minlength:3,    
        require: true
    },
    description:{
        type: String, 
    },
    products:{
        type: Array,
        require: true
    }
})

module.exports = mongoose.model("Category", categorySchema)