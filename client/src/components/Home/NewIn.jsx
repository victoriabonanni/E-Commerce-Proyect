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
    // console.log(productos)
    const newProduct = productos.slice(productos.length - 2)
    // console.log(newProduct)
    return (
        <div className="products">
            
            {newProduct.map((producto) => {
                return (
                    <Link key={producto._id} to={`/product/${producto._id}`} className="title1 tarjeta">
                        <div class="card-text" >
                            <img src={producto.image.url} alt={"imágen de producto"} class="card-img-top imagen" />
                            <div class="card-body">
                                <h3 class="titleP">{producto.title}</h3>
                                <h3 class="titleP">{producto.price}€</h3>
                            </div>
                        </div>
                    </Link>




                )
            }
            )
            }

        </div>
    )
}


export default NewIn