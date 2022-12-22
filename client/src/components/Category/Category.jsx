import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";    //método de react router que me ayuda a recibir, por parámetros, la info del objeto // es el req.params del back
                 


const Category = () => {
  const { categoryId } = useParams()                        // Id va a ser el id que voy a recibir de cada categoria y con la ayuda de useParams se cambia solo cada vez que selecciono una categoria diferente
  const [category, setCategory] = useState({})      
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")
  const [productos, setProductos] = useState([])
  const [subcategory, setSubcategory] = useState([])
  

  const [successM, setSuccessM] = useState(null)    // mensaje satisfatorio, alerta de okey
  const [errorM, setErrorM] = useState(null)

  useEffect(() => {
    try {
      const getCategory = async () => {
        const response = await axios.get(`http://localhost:5001/api/category/${categoryId}`)    // le paso el parametro de referencia que se completa y cambia automaticamente
        console.log(response)
        setCategory(response.data.category) 
        setProductos(response.data.category.products)
        setSubcategory(response.data.category.subcategory)      // todo lo que me devuelve aqui lo tengo guardado en la variable q cree "category"
      }       
      getCategory()                                    
    } catch (error) {
      console.log(error.response)
    }
  }, [])
  console.log(productos)
  const deleteCategory = async (event) => {
    event.preventDefault()
    let opcion = window.confirm("¿Seguro que quieres eliminar la categoria? Se eliminará todo su contenido, incluyendo subcategorias y productos")
    if (opcion == true) {
      try {
        const response = await axios.delete(`http://localhost:5001/api/category/${categoryId}`, {
          headers: {
            Authorization: token
          }
        })
        console.log(response)

        setSuccessM(response.data.message)
        setTimeout(()=>{
            window.location.href="/all_categories"
           }, 1000)

      } catch (error) {
        setErrorM(error.response.data.message)
        setTimeout(()=>{
            window.location.href="/category/:Id"
          }, 1000)
      }
    }
  }

  return (
    <div >
          {/* <p>{category.description}</p> */}
      {subcategory.map((subcategoria)=>{
        return(
          <Link key={subcategoria._id} to={`/subcategory/${subcategoria._id}`} class="title1">   
          <div class="card container-fluid subcategory">
          <img src={subcategoria.image.url} alt={"imágen de subcategoria"} class="card-img-top i imagen" />
          <div class="card-body">
            <h3 class="title">{subcategoria.title}</h3>
            <h5 class="descrip">{subcategoria.description}</h5>
            </div>
          </div>
          </Link>
        )
      })}
<div class="products">
      {productos.map((producto) => {                 // a la .map function le tengo que indicar parametros, para indicar cada elemento de mi array (ponemos el nombre que queramos, despues lo utilizamos en la ruta)
                                                     // utilizo el nombre que le di a la array resultante de productos mas arriba y el .map es lo mismo que un bucle for (por eso necesito los parametros, para que el .map recorra toda la array y me busque y muestre lo que yo le indique)
        return (                                     // utilizo el nombre del parámetro para q el .map busque todas las propiedades/keys que quiero renderizar de cada objeto
                                                     // la id es el elemento único de cada objeto, no se repite en ninugno. Es parte de la funcion .map indicarlo
          <Link key={producto._id} to={`/product/${producto._id}`} className="title1 tarjeta">   
          <div class="card-text" >
          <img src={producto.image.url} alt={"imágen de producto"} class="card-img-top imagen"/>
          <div class="card-body">
            <h3 class="titleP">{producto.title}</h3>
            <h3 class="titleP">{producto.price}€</h3>
            
            </div>
          </div>
          </Link>

        );
      })}   
      </div>                               
          <Link to="/all_categories"><button>Volver</button>
          </Link>
          {role == 2 ? (<Link to={`/new_subcategory/${category._id}`}><button>Añadir subcategoría</button></Link>) : (<></>)} 
          {role == 2 ? (<button onClick={deleteCategory}>Eliminar Categoria</button>) : (
            <div></div>
          )}
          {role == 2 ? (
            <Link to={`/edit_category/${categoryId}`}>
              <button>Editar</button>
            </Link>) : (
              <div></div>
            )}
  </div>

      
    
  )
}

export default Category