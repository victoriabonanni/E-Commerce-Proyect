import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const User = () => {
    const [user, setUser] = useState({})     // creo un state donde voy a guardar el objeto q reciba con el useEffect       
    const token = localStorage.getItem("token")
    // const role = localStorage.getItem("role")
    const name = localStorage.getItem("name")

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
        <div class="profile container-fluid">
            <h1 className="title1">Hola {user.name}</h1>
            <p class="text-muted">Aquí tienes un resumen del estado de tu cuenta y acciones rápidas a lo más utilizado.</p>
<div class="card_data">
            <div key={user._id} class="card">
                <div class="card-header">
                    DATOS PERSONALES
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Nombre: {user.name}</li>
                    <li class="list-group-item">Email de contacto: {user.email}</li>
                    <label class="list-group-item">Contraseña:  <input type="password" name="password" value={user.password} class="password" />
                    </label>
                </ul>
            </div>


            <Link to={"/edit_myprofile"}>
                <button class="button">Editar mis datos</button>
            </Link>


            {/* <hr class="divider" /> */}
            <div class="card">
                <div class="card-header">
                    DATOS DE PAGO
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Nº Tarjeta: xxxx xxxx xxxx xxxx</li>
                    <li class="list-group-item">Dirección de envío: </li>
                </ul>
            </div>
            <Link to={"/edit_myprofile"}>
                <button class="button">Editar datos de pago</button>
            </Link>
            </div>
            {/* <hr class="divider" /> */}

            <h5 class="title2">MIS PEDIDOS</h5>

            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>23/09/22</td>
                        <td>Enviado</td>
                        <td>36€</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>03/11/22</td>
                        <td>Enviado</td>
                        <td>128€</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>22/12/22</td>
                        <td>En reparto</td>
                        <td>43€</td>
                    </tr>
                </tbody>
            </table>
            <div class="button2">
            <button class="button">Ayuda con un pedido</button>
            <button class="button" onClick={deleteUser}>Eliminar mi Cuenta</button>
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


