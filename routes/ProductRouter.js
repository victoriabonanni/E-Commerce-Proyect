const express = require("express");
const Product = require("../models/Product");
const ProductRouter = express.Router();
const auth = require("../middleware/auth")                                          // para hacer privada una ruta declaro la función auth que se a voy a requerir al archivo auth.js en donde se ejecuta ese codigo
const authAdmin = require("../middleware/authAdmin")                                // para crear rutas solamente de admin
const authPro = require("../middleware/authPro")                                    // ruta privada del user pro

ProductRouter.post("/product", auth, authAdmin, async (req, res) => {              // añado objetos a mi base de datos respetando ciertas condiciones
                                                                        // "/product" va a indicar el nombre de mi end-point - sustantivo y minuscula siempre
  const { title, description, price, categoryId, subcategoryId, image } = req.body;                       // el auth es para ejecutar dicha funcion (const auth) y hacer la ruta privada. No se me va a ejecutar esa ruta sin autorizacion. Si el auth esta ok, ademas le ejecuto la funcion de authAdmin para indicar que esa ruta es solamente para admin
  try {                                                              
    if (!title || !description || !price || !categoryId || !image) {                             // condiciones para crear mis objetos en la DB - son condiciones para nosotros, no tiene nada q ver con el cliente, esos mensajes no son alertas q ve el cliente
      return res.status(400).json({                                     // si no hay title, ni description, etc en el require body, devuelveme una respuesta con el status en formato json y que tire un mensaje.
        success: false,
        message: "Please fill all the fields",
      });
    }
    if (title.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Title must be between 3 and 50 characters",
      }); 
    }
    if (description.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Description must be between 10 and 450 characters",
      })
    }
    let product = new Product({                                         // creo un nuevo objeto Product según el schema (q viene de la const Product = require ../models/Product), que lo voy a guardar en mi variable product y va a llevar las siguientes propiedades
      title,
      description,
      price,
      category: categoryId,
      subcategory: subcategoryId,
      image
    });
    await product.save();                                              // "espera" antes de darme una respuesta, con la funcion .save me guarda ese objeto let product en mi base de datos
    return res.status(200).json({
      success: true,
      product,
      message: "Product created successfully",
    });
  } catch (error) {                                                    // el catch siempre tira errores de servidor (500)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

ProductRouter.get("/products", async (req, res) => {                               // Devuelve varios ojetos de la DB 
  try {
    let products = await Product.find({})
    return res.status(200).json({
success: true,
products
    })
  } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    })
  }
});

ProductRouter.get("/productspro", auth, authPro, async (req, res) => {             // Devuelve varios ojetos de la DB 
  try {
    let productsPro = await Product.find({})
    return res.status(200).json({
success: true,
productsPro
    })
  } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    })
  }
});

ProductRouter.get("/product/:id", async (req, res) => {                            // Devuelve un objeto en concreto a través del ID de la DB
const {id} = req.params                                                            // el id lo pasamos por parámetros {}
try {
  let product = await Product.findById(id).populate({path:"category", select:"title"}).populate({path:"subcategory", select:"title"})      // "espera" busca dentro de la colección creada Product a través del metodo ID y me va a devolver todo el objeto con ese ID. 
return res.status(200).json({                                                               // .populate desglosa el objeto creado dentro de otro objeto, puedo solicitarlo completo ("category") o seleccionar alguna propiedad en concreto ({path:"category", select:"title"})
  success: true,
  product,
  message: "Product found saccessfully"
})
} catch (error) {
  return res.status(500).json({
success: false,
message: "Internal server error"

  })
}
})

ProductRouter.put("/product/:id", auth, authAdmin, async (req,res)=>{              // Modificar un objeto en concreto
// const {id} = req.params;                                              // paso el id por parámetros {}
const {title, description, price} = req.body                                              // paso por el body el valor que voy a querer cambiar
try {
  await Product.findOneAndUpdate({_id: req.params.id}, {title, description, price})                        
  return res.status(200).json({
    success: true,
    message: "Product updated successfully"
  });
} catch (error) {
  return res.status(500).json({
    success: false,
    message: error.message
  })
}

})

ProductRouter.delete("/product/:id", auth, authAdmin, async (req,res)=>{           // Elimina un objeto
const {id} = req.params;
try {
  await Product.findByIdAndDelete(id)
  return res.status(200).json({
    success:true,
    message: "Product deleted successfully"
  })
} catch (error) {
  return res.status(500).json({
    success:false,
    message: error.message
  })
  
}


})


module.exports = ProductRouter;
