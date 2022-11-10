const express = require("express");
const Category = require("../models/Category");
const CategoryRouter = express.Router();

CategoryRouter.post("/category", async (req, res) => {                    // añado objetos a mi base de datos respetando ciertas condiciones
                                                                        // "/product" va a indicar el nombre de mi end-point - sustantivo y minuscula siempre
  const { title, description, products } = req.body;
  try {
    if (!title || !products) {                             // condiciones para crear mis objetos en la DB - son condiciones para nosotros, no tiene nada q ver con el cliente, esos mensajes no son alertas q ve el cliente
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
      description,
      products,
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

CategoryRouter.get("/categories", async (req, res) => {
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


module.exports = CategoryRouter;