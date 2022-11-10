// IMPORT DEPENDENCIES - primera linea
const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")

// AUTORIZACIÓN PARA TRAER DATOS DE POSTMAN
app.use(express.json({extended: true}))      
app.use(express.urlencoded())                             // le indico al servidor (app) que me permita tomar datos a través del urlencoded (en este caso texto) del postman


// IMPORT ROUTES - segunda linea
const ProductRouter = require("./routes/ProductRouter")   // importo/ejecuto todas las rutas que encuentr en ProductRouter.js
const UserRouter = require("./routes/UserRouter")
const CategoryRouter = require("./routes/CategoryRouter")

// CONNECT TO DATABASE
const URL = process.env.MONGODB_URL
mongoose.connect(URL, {}).then(()=> {
    console.log("BBDD is now connected")
}).catch((error) => {
    console.log(error)
})
 
// UTILIZACIÓN DE LAS RUTAS
app.use("/api", ProductRouter)                           // "/api" indica el end-point de partida y le digo que agarre todas las rutas que encuentre en "ProductRouter"
app.use("/api", UserRouter)
app.use("/api", CategoryRouter)                                             // end-point de partida (miURL + /api) + /product (ruta de cada Router)
                                                         // end-point de partida: http://localhost:5001/api + /product (5001 es el puerto que yo indique en .listen)
app.listen(5001, ()=>{
    console.log("Server is running con port 5001");
} )