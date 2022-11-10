const mongoose = require("mongoose")                              // Necesito usar mongoose entonces la requiero 

const productSchema = new mongoose.Schema({                       // Creo un borrador de mi modelo, con estos datos y la ayuda de mongoose, voy a crear mi modelo final

     title:{
        type: String,
        maxlength:50,
        minlength:3,                                              // key y values q voy a tener que cumplir y tener para crear un objeto en mi DB
        require: true                                             // lo requiero obligatoriamente para crear el objeto
     },
     description:{
        type: String,
        maxlength:450,
        minlength: 10,
        require: true
     },
     price:{
        type: String,
        require: true
     },
     image:{
      type: Object
     }
},
{timestamps: true})                                              // me escribe últ fecha de edición, fecha de creación 

// TO EXPORT MY MODEL 
module.exports = mongoose.model("Product", productSchema)        // me exporta los datos del modelo con ayuda de mongoose, q lo voy a llamar "Product" y va a estar formado por una colección de objetos q van a salir de mi borrador
