import React from "react";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"


const Logout = ()=>{

    localStorage.removeItem("token")
    localStorage.removeItem("role")

    

useEffect(()=>{
    setTimeout(()=>{
        window.location.href="/"
    }, 1000)
},[])

return(
    <div className="logout">
        <h2>Esperamos verte pronto!</h2>
    </div>
)
}

export default Logout