import React from "react";
import axios from "axios";
import { useState } from "react";


const NewCategory = () => {
  const [category, setCategory] = useState({
    title: "",
    description:""
  });

  const [image, setImage] = useState(false);
  const token = localStorage.getItem("token");

  const [successM, setSuccessM] = useState(null);
  const [errorM, setErrorM] = useState(null);

  const handleUpload = async (event) => {             // FUNCION PARA SUBIR IMAGEN/ARCHIVOS POR EL FRONT
    event.preventDefault();
    try {
      const file = event.target.files[0];             // Declaramos variable para el file - lo que ingreso por el input "seleccionar archivos" siempr esta en la posicion 0.
      if (!file) return alert("La imágen no se ha cargado correctamente");

      let formData = new FormData();                 // me ayuda a crear un objeto con un key y la value, donde "file" con comillas es el nombre de la key y el file es el valor (el archivo/imagen que subo por el input)
      formData.append("file", file);
      const response = await axios.post(
        "http://localhost:5001/api/upload",          // le digo donde me va a mandar esta imagen a mi DB
        formData,                                    // le paso todo el objeto
        {
          headers: {
            Authorization: token,                   // y le paso la autorizacion donde esta el token, porque es ruta privada
            "content-type": "multipart/form-data",  // solo se pasa cuando se suben archivos tipo imagen
          },
        }
      );

      setImage(response.data);                      // guardo la respuesta del objeto de la imagen subida
      setSuccessM(response.data.message);
      
    } catch (error) {
      setErrorM(error.response.data.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(        // le paso el objeto del producto y el objeto resultante de la imagen
        "http://localhost:5001/api/category",
        { ...category, image },
        { headers: { Authorization: token } }   // le vuelvo a pasar el token para crear el producto
      );
      console.log(response.data);

      setSuccessM(response.data.message);
      setTimeout(()=>{
        window.location.href="/all_categories"
       }, 1000)

    } catch (error) {
      setErrorM(error.response.data.message);
    }
  };

  return (
  <div class="formEdit">
   
    <h1 class="titulo">AGREGAR UNA CATEGORIA</h1>
      <form className="formulario form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          class="form-control"
          placeholder="Título"
        />
        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Descripción"
          class="form-control"
        ></textarea>
        <input
            class="form-control form-control-sm"
            type="file"
            name="file"
            onChange={handleUpload}
          />
        <img src={image.url} alt="imagen" class="upload" />

        <button type="submit" class="btn btn-dark">
          AÑADIR CATEGORIA
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
  </div>)
};

export default NewCategory;
