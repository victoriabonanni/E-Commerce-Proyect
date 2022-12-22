import React from "react";
import axios from "axios";
import { useState } from "react";
import {FiEyeOff} from "react-icons/fi"
                                            // info guarda los datos con la ayuda del setInfo
const Login = () => {           
    const [info, setInfo] = useState({      // si los parentesis quedan vacios solo con el formato, es porque recibe
        email: "",                          // adentro del parentesis se pone el formato de lo que voy a crear
        password: "",                       // creo un estado con un objeto dentro, y ese objeto tiene que llevar las propiedades del back, las que estoy requeriendo
      });
                                            
    const [successM, setSuccessM] = useState(null)    // mensaje satisfatorio, alerta de okey
    const [errorM, setErrorM] = useState(null)        // mensaje de error

  const onChangeInput = (event) => {          // sirve para que la pagina no se actualize sola cada vez que cargamos algo en un input
    const { name, value } = event.target;     // me guardan los datos que pongo por el input
    setInfo({...info, [name]: value });      // con la ayuda del setinfo va a guardar en la variable ...info lo que me salga en el valor del input
  };                                         // esos datos se los asigno al name (key del modelo) y le doy un valor (lo que se ingrese por el input)
// console.log(info)

  const loginSubmit = async (event) => {      // cuando ejecute este funcion encargada de agarrar toda la info del onchange y me la envia a la ruta de localhost, al back (a la DB)
    event.preventDefault();                   // para que no se refresque la pagina - se ejecuta cuando se apreta el boton de submit
    try {
      const response = await axios.post("http://localhost:5001/api/login", {       // lo mando a mi ruta del back
      ...info,                                                                     // cada vez que vamos a crear algo y mandarlo al back por el body, a la llamada le paso el objeto creado ..info va a ser el email y la password ingresadas por el input
      });
      console.log(response)
      setSuccessM(response.data.message)
      
                                                                 // localStorage.getItem("token") es para las otras rutas que requieren autorizacion, las llamas con un get directamente
     localStorage.setItem("token", response.data.accessToken);   //despues del login me guarda la autrizacion del token del usuario en la memoria del navegador y la sesion permanece logueada
     localStorage.setItem("role", response.data.user.role)       // guardo el role en local storage                     
                                                                 // guardo el name en el local storage para mostrarlo en la navbar cuando el user este logueado
     setTimeout(()=>{
      window.location.href="/"
     }, 1000)  
                                                               
    } catch (error) {
      setErrorM(error.response.data.message)
      setTimeout(()=>{
        window.location.href="/login"
      }, 2000)
    }                               
  };

  return (
    <div class="login form-control">
      <h1 class="titulos">INICIAR SESIÓN</h1>                                
      <form className="formulario" onSubmit={loginSubmit}> 
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"   // estas 3 propiedades hay que agregalas
            name="email"              // agregamos name(mismo nombre que la key que le puse en el modelo) y value manualmente
            value={info.email}
            placeholder="Email"       // va a ser lo que yo meta por el input
            onChange={onChangeInput}   // llamo a la funcion para que me guarde los datos que mando por el input. Las funciones en react se llaman con {}
          />
        </div>
        <div className="mb-3 password">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={info.password}
            onChange={onChangeInput}
            placeholder="Contraseña"
          >
          </input>
          <span class="show"><FiEyeOff/></span>
        
        </div>
        
        <button type="submit" className="btn btn-dark form-control botones">
          INICIAR SESIÓN
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
      <p>Si todavía no tienes una cuenta registrate con tus datos ingresando aquí </p>
      <a className="btn-light form-control botones2" href="/new_user">
          CREAR CUENTA
        </a>
        </div>
        <hr class="divider" />
    </div>
  );
};

export default Login;
