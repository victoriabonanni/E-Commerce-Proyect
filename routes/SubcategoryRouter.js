const express = require("express");
const Category = require("../models/Category")
const Subcategory = require("../models/Subcategory");
const SubcategoryRouter = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const authPro = require("../middleware/authPro");

SubcategoryRouter.post("/subcategory/:id", auth, authAdmin, async (req, res) => {
const {id} = req.params                                                // paso el id de la category por parametros
const { title, description, image } = req.body
try {
  let category = await Category.findById(id)
if(!category){ return res.status(400).json({
        success: false,
        message: "Category does not exist",
      });
    }
    if (!title || !description) {
          return res.status(400).json({
            success: false,
            message: "Please fill all the fields",
          });
        }
        let newsubcategory = new Subcategory({
              title,
              description,
              image,
              category: id,                                             // se añade automaticament el id de category pasado en parámetros
            });
            await newsubcategory.save();                                // .save guarda el objeto en la DB.
await Category.findByIdAndUpdate(id, {
  $push: {
    subcategory: newsubcategory._id
  }
})
return res.status(200).json({
  success:true,
  message: "Subcategory created successfully"
})
} catch (error) {
  return res.status(500).json({
    success:false,
    message: error.message
  })
}


  
});

SubcategoryRouter.get("/subcategories", async (req, res) => {
  // Devuelve todas las subcategorias (objetos) en una array
  // const {id} = req.params
  try {
    let subcategories = await Subcategory.find({});
    return res.status(200).json({
      success: true,
      subcategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// SubcategoryRouter.get("/subcategoriespro", auth, authPro, async (req, res) => {
//   // Devuelve todas las subcategorias (objetos) en una array
//   try {
//     let SubcategoriesPro = await Subcategory.find({});
//     return res.status(200).json({
//       success: true,
//       SubcategoriesPro,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// });

SubcategoryRouter.get("/subcategory/:id", async (req, res) => {
  // Devuelve un objeto en concreto a través del ID de la DB
  const { id } = req.params;
  try {
    let subcategory = await Subcategory.findById(id).populate({path:"products", select:"title price description image"}); // "espera" busca dentro de la colección creada Category a través del metodo ID y me va a devolver todo el objeto con ese ID.
    return res.status(200).json({
      // el id lo pasamos por parámetros {}
      success: true,
      subcategory,
      message: "Subcategory found saccessfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

SubcategoryRouter.put("/subcategory/:id", auth, authAdmin, async (req, res) => {
  // Modificar un objeto en concreto
  const { id } = req.params; // paso el id por parámetros {}
  const { title, description, image } = req.body; // paso por el body el valor que voy a querer cambiar
  try {
    await Subcategory.findByIdAndUpdate(id, { title, description, image });
    return res.status(200).json({
      success: true,
      message: "Subcategory updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

SubcategoryRouter.delete("/subcategory/:id", auth, authAdmin, async (req, res) => {
    // Elimina un objeto en concreto por id
    const { id } = req.params;
    try {
      await Subcategory.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
        message: "Subcategory deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = SubcategoryRouter;
