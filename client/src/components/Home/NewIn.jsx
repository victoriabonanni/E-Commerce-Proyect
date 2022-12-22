import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const NewIn = () => {
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        const getNewIn = async () => {
            const response = await axios.get("http://localhost:5001/api/products");

            setProductos(response.data.products)
        };

        getNewIn();
    }, []);
console.log(productos)
const newProduct = productos.slice(productos.length-2)
// console.log(newProduct)
    return (
        <div>
            <h1 className="products">Productos</h1>
            {newProduct.map((producto) => {

                return (

                    <Link key={producto._id} to={`/product/${producto._id}`} className="product">
                        <div>
                            <h3>{producto.title}</h3>
                            <h4>{producto.price}€</h4>
                            <p>{producto.description}</p>
                            <img src={producto.image.url} alt={"imágen de producto"} />
                        </div>
                    </Link>)}
              )
            }

        </div>
    )
}


export default NewIn