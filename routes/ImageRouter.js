const express = require("express");
const ImageRouter = express.Router();
const cloudinary = require("cloudinary"); // dependencia que conecta el back-end con mi cloudinary
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin")
const fs = require("fs"); // método de js que nos permite subir archivos/cosas

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

ImageRouter.post("/upload", auth, authAdmin, async (req, res) => {
  // PARA SUBIR IMÁGENES
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      // si no hay imagen subida o el tamaño de la img es 0, devuelve error de usuario
      return res.status(400).json({
        success: false,
        message: "No image found to upload",
      });
    const file = req.files.file; // nombre de file se lo pongo yo. declaro variable que va a ser igual al file lo que yo meta por el body como un file
    

    if (file.size > 3024 * 3024) {
      // condicion que hace referencia al tamaño de img
      removeTmp(file.tempFilePath);
      return res.status(400).json({
        success: false,
        message: "Image size is too big",
      });
    }
    if (
      // condicion que hace referencia al formato/tipo de img
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/svg"
    ) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({
        success: false,
        message: "The image format is not supported",
      });
    }
    // uploader es un método de cloudinary que junto con la funcion .upload permite subir los archivos
    cloudinary.v2.uploader.upload(
      file.tempFilePath,              //archivo que queremos cargar
      { folder: "fusca ecommerce" },   // carpeta que se crea automáticamente para guardar la img
      async (error, result) => { 
        if (error) throw error; // si hay error, devuelveme el error
        removeTmp(file.tempFilePath);
        res.json({
          // no pongo el status porque con la dependencia cloudinary por lo gral tira error.
          success: true,
          message: "Image uploaded successfully",
          public_id: result.public_id,            
          url: result.secure_url,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


ImageRouter.post("/destroy", auth, authAdmin, (req,res)=>{            
try {
    const {public_id} = req.body               // creo variable de lo que voy a requerir por el body
    if(!public_id)                            // la public_id se crea cuando cargamos una img, me la devuelve el objeto de img. La encuentro en la DB. 
    return res.status(400).json({
        success:false,
        message: "No image selected"
    })

cloudinary.v2.uploader.destroy(public_id, async (error, result)=>{
    if (error) throw error;                                           // si hay error, muestramelo y sino se ejecuta y devuelve mensaje positivo
    res.json({ msg: "Image was deleted successfully"})
})
} catch (error) {
    return res.status(500).json({
        success:false,
        message: error.message
    })
}
})

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
      if (err) throw err;
    });
  };


module.exports = ImageRouter;
