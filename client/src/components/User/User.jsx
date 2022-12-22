import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const User = () => {
    const [user, setUser] = useState({})     // creo un state donde voy a guardar el objeto q reciba con el useEffect       
    const token = localStorage.getItem("token")
    // const role = localStorage.getItem("role")

    const [successM, setSuccessM] = useState(null)    // mensaje satisfatorio, alerta de okey
    const [errorM, setErrorM] = useState(null)


    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get("http://localhost:5001/api/user", {
                headers: {
                    Authorization: token
                }
            })
            console.log(response)
            setUser(response.data.user)       // todo lo que me devuelve aqui lo tengo guardado en la variable q cree "user"
        }                                           // creamos variable user y con la ayuda de setUser guardamos nuestra respuesta
        getUser()
    }, [])

    const deleteUser = async (event) => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        event.preventDefault()
        let opcion = window.confirm("¿Seguro que quieres eliminar tu cuenta? Es necesario estar registrado para realizar pedidos")
        if (opcion == true) {
            try {
                const response = await axios.delete("http://localhost:5001/api/user",
                    {
                        headers: {
                            Authorization: token
                        }

                    })
                console.log(response)
                setSuccessM(response.data.message)

                setTimeout(() => {
                    window.location.href = "/"
                }, 1000)

            } catch (error) {
                setErrorM(error.response.data.message)
                setTimeout(() => {
                    window.location.href = "/user"
                }, 1000)

            }
        }
    }

    return (
        <div>
            <h1 className="products">Mi Cuenta</h1>
            <div key={user._id}>
                <h3>{user.name}</h3>
                <h4>{user.email}</h4>
                <input type="password" name="password" value={user.password}></input>

            </div>
            <div>
                <Link to={"/edit_myprofile"}>
                    <button>Editar mis datos</button>
                </Link>
                <button onClick={deleteUser}>Eliminar mi Cuenta</button>
            </div>
            <div class="alert alert-success" role="alert" style={{ display: successM ? "block" : "none" }}>
                {successM}
            </div>
            <div class="alert alert-danger" role="alert" style={{ display: errorM ? "block" : "none" }}>
                {errorM}
            </div>



        </div>
    )
}

export default User


