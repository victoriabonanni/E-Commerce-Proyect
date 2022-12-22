import React from "react";
import axios from "axios";
import { useState } from "react";
import Navbar from "../../Navbar/Navbar";

const Register = () => {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [successM, setSuccessM] = useState(null);
  const [errorM, setErrorM] = useState(null);

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setInfo({...info, [name]: value });
  };

// console.log(info)

  const registerSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/register",     
        {...info}
      );
      console.log(response.data)
      setSuccessM(response.data.message);
      setTimeout(()=>{
        window.location.href="/login"
       }, 1000)  


    } catch (error) {
      setErrorM(error.response.data.message);
      setTimeout(()=>{
        window.location.href="/new_user"
      }, 1000)
    }
  };
  return (
    <div class="login form-control">
      <h1 class="titulos">REGISTRARSE</h1>
      <p class="register">Es necesario estar registrado para realizar pedidos</p>
      <form className="formulario" onSubmit={registerSubmit}>
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            id="exampleInputName1"
            // aria-describedby="emailHelp"
            name="name"
            value={info.name}
            onChange={onChangeInput}
            placeholder="Nombre"
          />
        </div>
        <div class="mb-3">
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={info.email}
            onChange={onChangeInput}
            placeholder="Email"
          />
          
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            name="password"
            value={info.password}
            onChange={onChangeInput}
            placeholder="Contraseña"
          />
          <div id="passwordHelpBlock" class="form-text password_text">
            La contraseña debe contener al menos 6 caracteres, una mayúscula y un número.
          </div>
        </div>
        <button type="submit" class="btn btn-dark form-control botones">
          CREAR CUENTA
        </button>
      </form>
      <div class="alert alert-success" role="alert" style={{display: successM ? "block" : "none"}}>
        {successM}
</div>
<div class="alert alert-danger" role="alert" style={{display: errorM ? "block" : "none"}}>
    {errorM}
</div>
<hr class="divider" />
<div class="formulario2">
      <p>Si ya tienes una cuenta incia sesión ingresando aquí</p>
      <a className="btn-light form-control botones2" href="/login">
          INICIAR SESIÓN
        </a>
        </div>
        <hr class="divider" />
    </div>
  );
};

export default Register;
