const express = require("express");
const Product = require("../models/Product");
const ProductRouter = express.Router();

ProductRouter.post("/product", async (req, res) => {                    // añado objetos a mi base de datos respetando ciertas condiciones
                                                                        // "/product" va a indicar el nombre de mi end-point - sustantivo y minuscula siempre
  const { title, description, price } = req.body;
  try {
    if (!title || !description || !price) {                             // condiciones para crear mis objetos en la DB - son condiciones para nosotros, no tiene nada q ver con el cliente, esos mensajes no son alertas q ve el cliente
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
      });
    }

    let product = new Product({                                         // creo un nuevo objeto Product según el schema (q viene de la const Product = require ../models/Product), que lo voy a guardar en mi variable product y va a llevar las siguientes propiedades
      title,
      description,
      price,
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

ProductRouter.get("/products", async (req, res) => {
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

// ProductRouter.get("/almohadon-apolo", async (req, res) => {
//   try {
//     let products = await Product.find({})
//     return res.status(200).json({
// success: true,
// products
//     })
//   } catch (error) {
//     return res.status(500).json({
//         success: false,
//         message: "Internal server error"
//     })
//   }
// });

module.exports = ProductRouter;
