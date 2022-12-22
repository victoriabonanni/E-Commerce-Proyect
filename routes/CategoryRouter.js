const express = require("express");
const Category = require("../models/Category");
const CategoryRouter = express.Router();
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/authAdmin")
const authPro = require("../middleware/authPro");

CategoryRouter.post("/category", auth, authAdmin, async (req, res) => {                    // añado objetos a mi base de datos respetando ciertas condiciones
                                                                              // "/product" va a indicar el nombre de mi end-point - sustantivo y minuscula siempre
  const { title, image } = req.body;          // paso tambien la subcategory por el body, pero no es obligatorio
  try {
    if (!title || !image) {                             // condiciones para crear mis objetos en la DB - son condiciones para nosotros, no tiene nada q ver con el cliente, esos mensajes no son alertas q ve el cliente
      return res.status(400).json({                                     // si no hay title, ni description, etc en el require body, devuelveme una respuesta con el status en formato json y que tire un mensaje.
        success: false,
        message: "Please fill all the fields",
      });
    }
    if (title.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Title must be between 2 and 20 characters",
      });
    }
    let category = new Category({                                         // creo un nuevo objeto Product según el schema (q viene de la const Product = require ../models/Product), que lo voy a guardar en mi variable product y va a llevar las siguientes propiedades
      title,
      image
    });
    await category.save();                                              // "espera" antes de darme una respuesta, con la funcion .save me guarda ese objeto let product en mi base de datos
    return res.status(200).json({
      success: true,
      category,
      message: "Category created successfully",
    });
  } catch (error) {                                                    // el catch siempre tira errores de servidor (500)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

CategoryRouter.get("/categories", async (req, res) => {                   // Devuelve todas las categorias (objetos) en una array
  try {
    let categories = await Category.find({})
    return res.status(200).json({
success: true,
categories
    })
  } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    })
  }
});

CategoryRouter.get("/categoriespro", auth, authPro, async (req, res) => {                   // Devuelve todas las categorias (objetos) en una array
  try {
    let categoriesPro = await Category.find({})
    return res.status(200).json({
success: true,
categoriesPro
    })
  } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    })
  }
});

CategoryRouter.get("/category/:id", async (req, res) => {                 // Devuelve un objeto en concreto a través del ID de la DB
  const {id} = req.params
  try {
    let category = await Category.findById(id).populate({path:"subcategory", select:"title description image"}).populate({path:"products", select:"title price description image"})                            // "espera" busca dentro de la colección creada Category a través del metodo ID y me va a devolver todo el objeto con ese ID. 
  return res.status(200).json({                                          // el id lo pasamos por parámetros {}
    success: true,
    category,
    message: "Category found saccessfully"
  })
  } catch (error) {
    return res.status(500).json({
  success: false,
  message: "Internal server error"
  
    })
  }
  })

CategoryRouter.put("/category/:id", auth, authAdmin, async (req,res)=>{                   // Modificar un objeto en concreto
  // const {id} = req.params;                                              // paso el id por parámetros {}
  const {title, description, image} = req.body                                              // paso por el body el valor que voy a querer cambiar
  try {
    await Category.findByIdAndUpdate({_id: req.params.id}, {title, description, image})                        
    return res.status(200).json({
      success: true,
      message: "Category updated successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
  
  })

CategoryRouter.delete("/category/:id", auth, authAdmin, async (req,res)=>{                // Elimina un objeto
    const {id} = req.params;
    try {
      await Category.findByIdAndDelete(id)
      return res.status(200).json({
        success:true,
        message: "Category deleted successfully"
      })
    } catch (error) {
      return res.status(500).json({
        success:false,
        message: error.message
      })
      
    }
    
    
    })

module.exports = CategoryRouter;
