import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";    //método de react router que me ayuda a recibir, por parámetros, la info del objeto
import e from "cors";


const Subcategory = () => {
  const { subcategoryId } = useParams()                        // Id va a ser el id que voy a recibir de cada categoria y con la ayuda de useParams se cambia solo cada vez que selecciono una categoria diferente
  const [subcategory, setSubcategory] = useState({})
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")
  const [productos, setProductos] = useState([])

  const [successM, setSuccessM] = useState(null)    // mensaje satisfatorio, alerta de okey
  const [errorM, setErrorM] = useState(null)

  useEffect(() => {
    try {
      const getSubcategory = async () => {
        const response = await axios.get(`http://localhost:5001/api/subcategory/${subcategoryId}`)    // le paso el parametro de referencia que se completa y cambia automaticamente
        console.log(response)
        setSubcategory(response.data.subcategory)
        setProductos(response.data.subcategory.products)      // todo lo que me devuelve aqui lo tengo guardado en la variable q cree "category"
      }
      getSubcategory()
    } catch (error) {
      console.log(error.response)
    }
  }, [])
  console.log(productos)
  const deleteSubcategory = async (event) => {
    event.preventDefault()
    let opcion = window.confirm("¿Seguro que quieres eliminar la subcategoria?")
    if (opcion == true) {
      try {
        const response = await axios.delete(`http://localhost:5001/api/subcategory/${subcategoryId}`, {
          headers: {
            Authorization: token
          }
        })
        console.log(response)

        setSuccessM(response.data.message)
        setTimeout(() => {
          window.location.href = "/all_categories"
        }, 1000)

      } catch (error) {
        setErrorM(error.response.data.message)
        setTimeout(() => {
          window.location.href = "/subcategory/:subcategoryId"
        }, 1000)
      }
    }
  }
  
  return (
    <div>

      {productos.map((producto) => {                 // a la .map function le tengo que indicar parametros, para indicar cada elemento de mi array (ponemos el nombre que queramos, despues lo utilizamos en la ruta)
        
        return (                                     // utilizo el nombre del parámetro para q el .map busque todas las propiedades/keys que quiero renderizar de cada objeto
          <Link key={producto._id} to={`/product/${producto._id}`} className="title1 products">
          <div>
          <div class="card">
  <img src={producto.image.url} class="card-img-top imagen"/>
  <div class="card-body">
    <h5 class="card-title title titleP">{producto.title}</h5>
    <h4 class="card-text titleP">{producto.price}€</h4>
  </div>
  <ul class="list-group list-group-flush">
    
    <li class="list-group-item">Medidas: 30x70</li>
    
  </ul>
  <div class="card-body">
    <a href="#" class="card-link btn btn-dark">AÑADIR AL CARRITO</a>
    <a href="/all_categories" class="card-link">Volver</a>
  </div>
</div>
          </div>
          </Link>)})}
          {role == 2 ? (<button onClick={deleteSubcategory}>Eliminar Producto</button>) : (
            <div></div>
          )}
          {role == 2 ? (
            <Link to={`/edit_subcategory/${subcategoryId}`}>
              <button>Editar</button>
            </Link>) : (
              <div></div>
            )}
            

              

          
          
   </div>   
  )    
}
export default Subcategory


            
      
            