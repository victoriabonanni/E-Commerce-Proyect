import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const EditProfile = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",                                   // 1. OBJETO DEL PRODUCTO
        password:""
    });

    const token = localStorage.getItem("token");         // 3. EL TOKEN - declaro de donde se va a tomar, guardado durante el login en el local storage
    const navigate = useNavigate

    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get("http://localhost:5001/api/user",
                { headers: { Authorization: token } })
            setUser(response.data.user)
        }
        getUser()
    }, [])

    const [successM, setSuccessM] = useState(null);      // MENSAJES DE ÉXITO O ERROR
    const [errorM, setErrorM] = useState(null);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    console.log(user);

    const handleSubmit = async (event) => {
        
        event.preventDefault();
        try {
            const response = await axios.put(              // le paso el objeto del producto y el objeto resultante de la imagen
                "http://localhost:5001/api/user",
                { ...user },
                { headers: { Authorization: token } }        // le vuelvo a pasar el token para crear el producto
            );
            console.log(response);

            setSuccessM(response.data.message);
            setTimeout(() => {
                window.location.href="/my_profile"
                // navigate("/my_profile")    // se usa cuando la ruta esta dentro del mismo componente
            }, 1000)

        } catch (error) {
            console.log(error.response)
            setErrorM(error.response.data.message);
        }

    };

    return (
        <div class="formulario">
            <form className="formulario" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    class="form-control"
                    placeholder={user.name}
                    
                />
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    class="form-control"
                    placeholder={user.email}
                />
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    class="form-control"
                    // value={user.password}
                    placeholder={user.password}
                />

                <button type="submit" class="btn btn-dark">
                    MODIFICAR MI PERFIL
                </button>
            </form>
            <div
                class="alert alert-success"
                role="alert"
                style={{ display: successM ? "block" : "none" }}
            >
                {successM}
            </div>
            <div
                class="alert alert-danger"
                role="alert"
                style={{ display: errorM ? "block" : "none" }}
            >
                {errorM}
            </div>
        </div>
    );
};

export default EditProfile;