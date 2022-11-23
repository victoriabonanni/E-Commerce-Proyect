const User = require("../models/User")

const authAdmin = async(req,res,next)=>{                 // se ejecuta desp de que se ejecute la funcion auth corroborando ANTES QUE NADA que haya token          
    try {                                                
        const user = await User.findOne({_id: req.user.id})           // le pido que me busque un user en la DB que su propiedad _id coincida con el id que me viene devuelto en el token (funcion verify)  

    if(user.role === 0 || user.role === 1){
        return res.status(400).json({
            success:false,
            message: "Access denied, you are not an Admin"
        })
    }
    next()                                                 // si esta todo ok y la condicion anterior no se cumple, le digo que siga con la ruta
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message
        })
        
    }
}

module.exports = authAdmin