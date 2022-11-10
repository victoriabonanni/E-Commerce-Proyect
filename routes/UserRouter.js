const express = require("express");
const User = require("../models/User");
const UserRouter = express.Router();

UserRouter.post("/user", async (req, res) => {                    // añado objetos a mi base de datos respetando ciertas condiciones
                                                                        // "/product" va a indicar el nombre de mi end-point - sustantivo y minuscula siempre
  const { nombre, apellido, mail, password } = req.body;
  try {
    if (!nombre || !apellido || !mail || !password) {                             // condiciones para crear mis objetos en la DB - son condiciones para nosotros, no tiene nada q ver con el cliente, esos mensajes no son alertas q ve el cliente
      return res.status(400).json({                                     // si no hay title, ni description, etc en el require body, devuelveme una respuesta con el status en formato json y que tire un mensaje.
        success: false,
        message: "Please fill all the fields",
      });
    }
    if (nombre.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Title must be between 2 and 20 characters",
      });
    }
    if (apellido.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Description must be between 2 and 20 characters",
      });
    }

    let user = new User({                                         // creo un nuevo objeto Product según el schema (q viene de la const Product = require ../models/Product), que lo voy a guardar en mi variable product y va a llevar las siguientes propiedades
      nombre,
      apellido,
      mail,
      password
    });
    await user.save();                                              // "espera" antes de darme una respuesta, con la funcion .save me guarda ese objeto let product en mi base de datos
    return res.status(200).json({
      success: true,
      user,
      message: "User created successfully",
    });
  } catch (error) {                                                    // el catch siempre tira errores de servidor (500)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

UserRouter.get("/users", async (req, res) => {
  try {
    let users = await User.find({})
    return res.status(200).json({
success: true,
users
    })
  } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    })
  }
});


module.exports = UserRouter;