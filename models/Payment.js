const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
user_id:{
    type: String,          
    required: true
},
nombre:{
    type: String,          
    required: true
},
mail:{
    type: String,          
    required: true
},
paymentId:{
    type: String,
    required: true
},
address:{
    type: Object
},
cart:{
    type: Array,
    default: []
},},
{timestamps: true}
)

module.exports = mongoose.model("Payment", paymentSchema)