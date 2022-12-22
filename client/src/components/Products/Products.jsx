import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"

 

const Products = () => {                              // useState es una funcion, q se tiene que declarar en una variable-> const [nombre que le queremos dar + setnombre] en react se usan corchetes para llamar a una funcion. Se puede utilizar sin el useEffect
  const [productos, setProductos] = useState([]);     // "productos" nombre que va a tener la variable y "setProductos" es reconocida por el Usestate como la funcion que los va a guardar      
                                                      // al usestate le pongo ademas corchetes vacios porque le digo que va a RECIBIR una array   
  useEffect(() => {                                   // useEffect es para traer datos guardados del back que quiera renderizar. Si tengo un componente que para mostrarse no necesita de los datos del back, no haria falta usar el useEffect.        
  const getProducts = async () => {                   // creo una funcion asincrona donde antes hago la llamada al axios y le pido que me traiga toda la ruta del back que yo le indique
  const response = await axios.get("http://localhost:5001/api/products"); // se pone toda la ruta del BACK

    setProductos(response.data.products)};            // ejecuto funcion declarada en la variable del useState
                                                      // como la api me devuelve toda la info en un objeto, le indico con el setproductos la ruta de lo que quiero que me muestre
  getProducts();                                      // ejecuto la funcion, dentro del useeffect
  }, []);                                             // se ponen corchetes vacios, porque le indico que una vez recibida la array devuelta que frene y se renderize solo una vez. Si no lo pongo se hace un bucle infinito
                                               
  console.log(productos);

  return (
    <div>
      <h1 className="products">Productos</h1>
      {productos.map((producto) => {                 // a la .map function le tengo que indicar parametros, para indicar cada elemento de mi array (ponemos el nombre que queramos, despues lo utilizamos en la ruta)
                                                     // utilizo el nombre que le di a la array resultante de productos mas arriba y el .map es lo mismo que un bucle for (por eso necesito los parametros, para que el .map recorra toda la array y me busque y muestre lo que yo le indique)
        return (                                     // utilizo el nombre del parámetro para q el .map busque todas las propiedades/keys que quiero renderizar de cada objeto
                                                     // la id es el elemento único de cada objeto, no se repite en ninugno. Es parte de la funcion .map indicarlo
          <Link key={producto._id} to={`/product/${producto._id}`} className="product">   
          <div class="card cproduct">
        <img src={producto.image.url} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{producto.title}</h5>
          <h4 class="card-title">{producto.price}€</h4>
          
        </div>
        
        </div>
          </Link>

        );
      })}
    </div>
  );
};   
                          // paso la id del producto por parametros y le agrego hacia donde tiene que ir (end point del front + id de producto)
export default Products;

