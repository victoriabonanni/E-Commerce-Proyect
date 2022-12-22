import React from "react";
import axios from "axios";
import { useState } from "react";
import {useParams, useNavigate} from "react-router-dom"

const SubCategory = () => {
  const {categoryId} = useParams()
  const [subcategory, setSubcategory] = useState({
    title: "",
    description: "",
    category:`${categoryId}`
  });
  
  const [image, setImage] = useState(false);
  const token = localStorage.getItem("token");
  
  const [successM, setSuccessM] = useState(null);
  const [errorM, setErrorM] = useState(null);
  // const navigate = useNavigate

  const handleUpload = async (event) => {
    event.preventDefault();
    try {
      const file = event.target.files[0]; 
      if (!file) return alert("La imágen no se ha cargado correctamente");

      let formData = new FormData(); 
      formData.append("file", file);
      const response = await axios.post(
        "http://localhost:5001/api/upload", 
        formData, 
        {
          headers: {
            Authorization: token, 
            "content-type": "multipart/form-data", 
          },
        }
      );
      console.log(response);

      setImage(response.data); 
      setSuccessM(response.data.message);
     
      
    } catch (error) {
      setErrorM(error.response.data.message);
      
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSubcategory({ ...subcategory, [name]: value });
  };
console.log(subcategory)

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5001/api/subcategory/${categoryId}`,
        { ...subcategory, image },
        { headers: { Authorization: token } } 
      );
      console.log(response.data);

      setSuccessM(response.data.message);
      setTimeout(()=>{
        window.location.href="/all_categories"
           }, 1000)
        // navigate("/all_categories")    // se usa cuando la ruta esta dentro del mismo componente
      
    } catch (error) {
      setErrorM(error.response.data.message);
    }
  };
return(
    <div>
         <h1>AGREGAR UNA SUBCATEGORIA</h1>
      <form className="formulario" onSubmit={handleSubmit}>
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
        <img src={image.url} alt="imagen" />

        <button type="submit" class="btn btn-dark">
          AÑADIR SUBCATEGORIA
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
)}

  export default SubCategory