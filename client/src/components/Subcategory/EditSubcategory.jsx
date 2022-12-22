import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditSubcategory = () => {
  const [subcategory, setSubcategory] = useState({
    title: "",
    description: "",                                   // 1. OBJETO DEL PRODUCTO
    image:""
  });

  const {subcategoryId} = useParams()

  const [image, setImage] = useState(false);           // 2.LA IMAGEN - creo variable para guardar la imagen que voy a cargar
  const token = localStorage.getItem("token");         // 3. EL TOKEN - declaro de donde se va a tomar, guardado durante el login en el local storage

  const [categorias, setCategorias] = useState([])

  const navigate = useNavigate
  
  useEffect(()=>{
    const getSubcategory = async ()=>{
      const response = await axios.get(`http://localhost:5001/api/subcategory/${subcategoryId}`)
      setSubcategory(response.data.subcategory)
      setImage(response.data.subcategory.image)
    }
    getSubcategory()

    const getCategory = async ()=>{
      const response = await axios.get("http://localhost:5001/api/categories")
      setCategorias(response.data.categories)
      console.log(response)
    } 
    getCategory()

    
  }, [])
  

  const [successM, setSuccessM] = useState(null);      // MENSAJES DE ÉXITO O ERROR
  const [errorM, setErrorM] = useState(null);
  

  const handleUpload = async (event) => {              // FUNCION PARA SUBIR IMAGEN/ARCHIVOS POR EL FRONT
    event.preventDefault();
    try {
      const file = event.target.files[0];              // Declaramos variable para el file - lo que ingreso por el input "seleccionar archivos" siempr esta en la posicion 0.
      if (!file) return alert("La imágen no se ha cargado correctamente");

      let formData = new FormData();                   // me ayuda a crear un objeto con un key y la value, donde "file" con comillas es el nombre de la key y el file es el valor (el archivo/imagen que subo por el input)
      formData.append("file", file);
      const response = await axios.post(
        "http://localhost:5001/api/upload",            // le digo donde me va a mandar esta imagen
        formData,                                      // le paso todo el objeto
        {
          headers: {
            Authorization: token,                      // y le paso la autorizacion porque es ruta privada, donde esta el token, porque la ruta es privada
            "content-type": "multipart/form-data",     // solo se pasa cuando se suben archivos tipo imagen
          },
        }
      );
      

      setImage(response.data);                         // guardo la respuesta del objeto de la imagen subida
      setSuccessM(response.data.message);

    } catch (error) {
      setErrorM(error.response.data.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSubcategory({ ...subcategory, [name]: value });
  };

  console.log(subcategory);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(              // le paso el objeto del producto y el objeto resultante de la imagen
        `http://localhost:5001/api/subcategory/${subcategoryId}`,
        { ...subcategory, image },
        { headers: { Authorization: token } }        // le vuelvo a pasar el token para crear el producto
      );
      console.log(response);

      setSuccessM(response.data.message);
      setTimeout(()=>{
        window.location.href="/all_categories"
        // navigate("/category/${categoryId}")    // se usa cuando la ruta esta dentro del mismo componente
      },1000)

    } catch (error) {
      console.log(error.response)
      setErrorM(error.response.data.message);
    }
  };

  return (
    <div class="formEdit">
    
      <h1 class="titulo">MODIFICAR UNA CATEGORIA</h1>
      
      <form className="formulario form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          class="form-control"
          placeholder={subcategory.title}
        />
        <textarea
          name="description"
          onChange={handleChange}
          placeholder={subcategory.description}
          class="form-control"
        ></textarea>
        
        <select
        class="form-control"
          name="categoryId"
          onChange={handleChange}
        >
          
          {categorias.map((categoria) => {
            return (
              <option
                name="categoryId"
                value={categoria._id}
                key={categoria._id}
              >
                {categoria.title}
              </option>
            );
          })}
        </select>
        
        <input
          class="form-control form-control-sm"
          type="file"
          name="file"
          onChange={handleUpload}
        />
       <img src={image.url} alt="" class="upload"/>

        <button type="submit" class="btn btn-dark">
          MODIFICAR SUBCATEGORIA
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

export default EditSubcategory;