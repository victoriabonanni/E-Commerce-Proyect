import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";    //método de react router que me ayuda a recibir, por parámetros, la info del objeto, es el req.params del back
                

const Product = () => {
  const { productId } = useParams()                // Id va a ser el id que voy a recibir de cada producto y con la ayuda de useParams se cambia solo cada vez que selecciono un producto diferente
  const [product, setProduct] = useState({})     // creo un state donde voy a guardar el objeto q reciba con el useEffect
  const [image, setImage] = useState({})        // creo un state para guardar la imagen
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")
  const [category, setCategory] = useState({})
  const [productos, setProductos] = useState([])
  const [successM, setSuccessM] = useState(null)    // mensaje satisfatorio, alerta de okey
  const [errorM, setErrorM] = useState(null)

  useEffect(() => {
    const getProduct = async () => {
      const response = await axios.get(`http://localhost:5001/api/product/${productId}`)    // le paso el objeto de productoId que se completa y cambia automaticamente
      console.log(response)
      setImage(response.data.product.image)         // guardamos la imagen recibida
      setProduct(response.data.product) 
      setCategory(response.data.product.category)      // todo lo que me devuelve aqui lo tengo guardado en la variable q cree "product"
    }                                           // creamos variable product y con la ayuda de setProduct guardamos nuestra respuesta
    getProduct()
  }, [])
  // console.log(category._id)
  // useEffect(() => {
     
      
      // const getCategory = async () => {
      //   const response = await axios.get(`http://localhost:5001/api/category/${category._id}`)    // le paso el parametro de referencia que se completa y cambia automaticamente
      //   console.log(response) 
      //   setProductos(response.data.category.products)      // todo lo que me devuelve aqui lo tengo guardado en la variable q cree "category"
      // }  
      // {category._id?(getCategory()):(<div></div>)}     
                                          
    
  // }, [])
  const deleteProduct = async (event) => {
    event.preventDefault()
    let opcion = window.confirm("¿Seguro que quieres eliminar el producto?")
    if (opcion == true) {
      try {
        const response = await axios.delete(`http://localhost:5001/api/product/${productId}`, {
          headers: {
            Authorization: token
          }
        })
        console.log(response)
        setSuccessM(response.data.message)
        setTimeout(()=>{
            window.location.href="/all_products"
           }, 1000)
        
      } catch (error) {
        setErrorM(error.response.data.message)
        setTimeout(()=>{
            window.location.href="/product/:productId"
          }, 1000)

      }
    }
  }

  return (
    <div>
      
      <div class="card cproduct">
        <img src={image.url} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{product.title}</h5>
          <p class="card-text">{product.description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">An item</li>
          <li class="list-group-item">A second item</li>
          <li class="list-group-item">A third item</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link btn btn-dark">AÑADIR AL CARRITO</a>
          <Link to="/all_products"><button>Volver</button>
          </Link>
          {/* <a href="/all_products" class="card-link btn btn-default">Volver</a> */}
          {role == 2 ? (<button onClick={deleteProduct}>Eliminar Producto</button>) : (
            <div></div>
          )}
          {role == 2 ? (
            <Link to={`/edit_product/${productId}`}>
              <button>Editar</button>
            </Link>) : (
              <div></div>
            )}
  </div>

      </div>
    </div>
  )
}


export default Product
