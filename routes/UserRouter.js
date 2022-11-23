const { json } = require("express");
const express = require("express");
const User = require("../models/User");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const { JsonWebTokenError } = require("jsonwebtoken");
const saltRounds = bcrypt.genSaltSync(10)  
const jwt = require("jsonwebtoken")                                    // con la funcion .genSaltSync le indico cuantas "vueltas" tiene que dar mi password antes que se # (hashe) - universal se usa 10 - sirve para reforzar la seguridad
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/authAdmin")

                                                                       // añado objetos (users en este caso) a mi base de datos respetando ciertas condiciones
UserRouter.post("/register", async (req, res) => {                   // "/user" va a indicar el nombre de mi end-point - sustantivo y minuscula siempre
  const { nombre, apellido, mail, password } = req.body;               // Declaro una variable para guardar lo que el user mete por el body (página web) 
  try {
    const user = await User.findOne({ mail });                         // va a encontrarme si tengo algun usuario dentro del modelo User que tenga el mismo mail que le pase antes por el body
    if (user) {
      return res.status(400).json({
        success: false,
        message: "This User is already registered, try another one",
      });
    }                                                                  // si llega a haber un user con ese mismo mail, devuelveme un error status 400 en formato json y con un mensaje.
    if (!nombre || !apellido || !mail || !password) {                  // condiciones para crear mis objetos en la DB -
      return res.status(400).json({                                    // si no hay nombre o apellido o mail o password devuelveme una respuesta con el error status 400 (error cliente) en formato json y con un mensaje de error.
        success: false,
        message: "Please fill all the fields",
      });
    }
    if (nombre.length < 2) {                                           // si el largo del nombre es menor a 2 caracteres, devuelveme un error status 400 en formato json y con un mensaje
      return res.status(400).json({
        success: false,
        message: "The name must be between 2 and 20 characters",
      });
    }
    if (apellido.length < 2) {
      return res.status(400).json({
        success: false,
        message: "The surname must be between 2 and 20 characters",
      });
    }
    if (password.length < 6) {                                          // regla general: las password tienen que tener mínimo 6 caracteres
      return res.status(400).json({
        success: false,
        message: "The password must contain at least 6 characters",
      });
    }                            
                                                                       // condiciones que tiene que cumplir el MAIL, como su formato xxx@xxx.com
    const validateMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validateMail.test(mail)) {                                    // "niego" (!) la validacion para que el .test me haga un testeo de todas estas condiciones
      return res.status(400).json({
        success: false,
        message: "The mail is not valid",
      });
    }
    const validatePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
    if(!validatePassword.test(password)){
      return res.status(400).json({
        success:false,
        message: "The password must contain a capital letter, a small letter and at least one number"
      })
    }
    
    let passwordHash = bcrypt.hashSync(password, saltRounds)            // encriptación de password recibe dos argumentos(la password y cuantas vueltas)
                                                                        // la funcion .hashSync es la encargada de ejecutar el hasheo # segun la password q puse y las vueltas (salt) declaradas más arriba
    let newuser = new User({                                            // declaro una variable para guardar un nuevo objeto nuevo (user) según las propiedades declaradas por el body y valores que le hayamos dado en el modelo - 
      nombre,
      apellido,
      mail,
      password:passwordHash,
    });

    await newuser.save();                                               // "espera" antes de darme una respuesta, con la funcion .save me guarda ese objeto nuevo en mi base de datos
    
    const accessToken = createToken({id: newuser._id})                  // creo una variable para guardar y ejecutar la funcion declarada createToken y le paso el id del newuser creado y guardado previamente (como un objeto dentro del parámetro)
    return res.status(200).json({
      success: true,
      newuser,
      message: "User created successfully",
      accessToken,                                                      // si esta todo ok, que me devuelva el status, el mensaje positivo, el newuser (creado y guardado previamente) y el accestoken (variable q guarda la creación del token)
    });
  } catch (error) {                                                     // el catch siempre tira errores de servidor (500)
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

UserRouter.post("/login", async (req,res)=>{                           // para el login de un usuario ya registrado - le requiero que por el body pase el mail y la password.  
  const {mail, password} = req.body;
  try {                           
    const user = await User.findOne({mail})                            // primero valido el mail y con .findOne le pido que busque si ese mail ingresado por el body ya esta registrado 
    if(!user){                                                         // pero si NO (!) esta registrado, devuelveme un error status 400 - error de cliente en formato json y con un mensaje
      return res.status(400).json({
        success: false,
        message: "Some of the fields are not correct"
      })
    }                                                                    // VALIDO PASSWORD
    const passwordOk = bcrypt.compareSync(password, user.password)         // con la funcion bcrypt.compare me desencripta la clave para comparar la que ingresa el user por el body con todas las password de los user registrados q esten en la base de datos y ver si coincide.
    if(!passwordOk){                                                     // si esa password no existe, tirame error 400 de usuario con mensaje 
      return res.status(400).json({
        success: false,
        message: "Some of the fields are not correct"
      })
    }

const accessToken = createToken({id: user._id})                         

    return res.status(200).json({                                       // si existe y es favorable
      success: true, 
      message: "User logged in successfully",
      accessToken
    })
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

UserRouter.get("/users", auth, authAdmin, async (req, res) => {
  try {
    let users = await User.find({}).select("nombre apellido");
    if(!users){
      return res.status(400).json({
        success:false,
        message: "No users found in the Database"
      })
    }
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

UserRouter.get("/user", auth, async (req, res) => {                 // Devuelve el user que este logeado
  try {                                                             // el auth sirve para logearte y asi tener acceso a todo el user
    const user = await User.findById(req.user.id)                   // "espera" busca dentro de la colección creada User a través de la ID si encuentra uno que coincida con el id logeado y verificado ya con su token en la funcion auth
  if(!user)                                                         // (req.user.id) : me da acceso a todo el usuario
    return res.status(400).json({                                         
    success: false,
    message: "User not found"                                       // condicion de negacion de refuerzo
  })
    return res.status(200).json({
      success: true,
      user                                                         // le pido que me devuelva toda la informacion del user
    })
  } catch (error) {
    return res.status(500).json({
  success: false,
  message: "Internal server error"
  })
  }
  })

UserRouter.put("/user", auth, async (req, res) => {
    const { nombre, apellido, mail, password } = req.body
  try {
      const user = await User.findByIdAndUpdate(req.user.id, {nombre, apellido, mail, password});
      if(!user)                                                         // (req.user.id) : me da acceso a todo el usuario
      return res.status(400).json({                                         
      success: false,
      message: "User not found"                                       // condicion de negacion de refuerzo
    })
      return res.status(200).json({
        success: true,
        user,
        message: "User updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });

UserRouter.delete("/user", auth, async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.user.id);
      if(!user)                                                         // (req.user.id) : me da acceso a todo el usuario
      return res.status(400).json({                                         
      success: false,
      message: "User not found"                                       // condicion de negacion de refuerzo
    })
      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });

UserRouter.put("/user/:id", auth, authAdmin, async (req, res) => {
  // Modificar un objeto en concreto
  const { id } = req.params; // paso el id por parámetros {}
  const { nombre, apellido, mail } = req.body; // paso por el body el valor que voy a querer cambiar
  try {
    await User.findByIdAndUpdate(id, { nombre, apellido, mail });
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

UserRouter.delete("/user/:id", auth, authAdmin, async (req, res) => {
  // Elimina un objeto
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

UserRouter.post("/cart", auth, async(req, res)=>{
  try {
    const user = await User.findById(req.user.id)                               // "espera" busca dentro de la colección creada User a través de la ID si encuentra uno que coincida con el id logeado y verificado ya con su token en la funcion auth
    // const {carrito} = req.body                                               // otra forman de escribir el codigo. Declaro una variable carrito que va a ser lo q se pida por el body       
  if(!user)                                                                    // (req.user.id) : viene de la mano de la funcion auth, es como su resultado. me da acceso a todo el usuario ya verificado
    return res.status(400).json({                                         
    success: false,
    message: "User not found"                                                  // condicion de negacion de refuerzo
  })
    await User.findOneAndUpdate({_id: req.user.id}, {cart:req.body.cart})     // buscame y actualizame dentro del modelo User, lo que el user encontrado por su id (req.user.id devuelto por el auth) agregue por el body al cart
    // await User.findOneAndUpdate({_id: user}, {cart: carrito})              // otra forma de escribir el codigo. escribo la variables declaradas mas arriba directamente
    return res.status(200).json({
      success:true,
      message: "Product successfully added to the cart"
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message: error.message
    }) 
  }
})
                                                                                     // funcion para generar token de autentificacion
const createToken = (user) =>{                                                       // declaro la funcion y le indico sobre qué parámetros
return jwt.sign(user, process.env.ACCES_TOKEN_SECRET, {expiresIn: '7d'})             // con la funcion .sign de jwt le estoy diciendo que la clave se genere al iniciar sesion. 
}                                                                                    // junto a los datos de x user y mi clave access token del archivo .env genero una NUEVA clave que va a expirar en la cantidad de dias que querramos. Esta clave seria mi token.


module.exports = UserRouter;


