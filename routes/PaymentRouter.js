const express = require("express")
const Payment = require("../models/Payment")
const User = require("../models/User")                                                // otra forma de asociar modelos es requiriendolo en una variable y utilizarla más abajo
const Product = require("../models/Product")
const auth = require("../middleware/auth")
const PaymentRouter = express.Router()


PaymentRouter.post("/payment", auth, async(req, res)=>{                                // funcion para efectuar un pago
    try {                                                                
        const user = await User.findById(req.user.id).select("nombre mail")              // compruebo si el user esta logueado buscando en el modelo USER (por eso lo nombro mas arriba en la variable) un user que coincida con el devuelto por el token (auth)
    if(!user) return res.status(400).json({
        success:false,
        message: "User does not exist"
    })
    const {_id, nombre, mail} = user                                                     // estos 3 datos me vienen devueltos por la autenticacion del token del user 
    const {cart, paymentId, address} = req.body                                         // estos datos son los que el user va a tener que meter por el body
    
const newPayment = new Payment({
    user_id: _id,
    nombre,
    mail,
    cart,
    paymentId,
    address
})

// cart.filter((product) =>{                                                            // es para filtrar por cantidad de producto y que si son varios se pongan todos juntos
//     return sold(product._id, product.quantity, product.sold)                     // jean skinny 10€ (product id) x5 unidades (product quantity) total 50€ (product sold)
// })

await newPayment.save()
return res.status(200).json({
success: true,
message: "Payment made successfully"
})
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
})

// const sold = async(id, quantity, sold)=>{                                             // paso 3 parámetros. El sold es la suma total de los productos anteriores
//     await Product.findOneAndUpdate({_id: id},{sold: quantity + sold})                 // para que cada vez que yo agrego un producto a mi carrito me lo tiene que sumar a los productos anteriores
// }

PaymentRouter.get("/payments", auth, async(req, res)=>{                                // para que un usuario pueda ver todos los pagos realizados en su cuenta
    try {
        const payments = await Payment.find()   //(req.user.id??)                                       // busco en el modelo de payment todos los pagos que me encuentre asociados a ese usuario
return res.status(200).json({
    success:true,
    payments
})
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})



module.exports = PaymentRouter