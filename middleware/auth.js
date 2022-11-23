const jwt = require("jsonwebtoken");
                                                                                 // para validar las rutas privadas
const auth = (req, res, next) => {                                               // arrow function - equivale a function auth(req,res,next){}
  try {                                                                         // con esta funcion comparo si el token generado coincide con la del ID
    const token = req.header("Authorization");                                  // creo variable para guardar lo que se requiera por el header -> en este caso la autorization
    if (!token)                                                                // NO HAY TOKEN
      return res.status(400).json({
        success: false,
        message: "Invalid Authentication (token is missing)",
      });
                                                                               // HAY TOKEN Y TENGO QUE VERIFICARLO
    jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (error, user) => {       // la funcion verify del jwt va a verificar si ese token coinide con el user para el que se generó
      if (error)                                                                      
        return res.status(400).json({
          success: false,
          message: "Invalid Authentication (incorrect token)",
        });
      req.user = user;                                                         // con esta clave verificada tiene acceso a todo el usuario
      next();                                                                  // .next es un middleware que se ejecuta para dar acceso, le da el ok para continuar si eL token existe y esta verificado ok
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = auth