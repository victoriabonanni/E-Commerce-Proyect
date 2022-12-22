import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            const response = await axios.get("http://localhost:5001/api/categories")
            console.log(response)
            setCategorias(response.data.categories)
        }
        getCategories()
    }, [])

    // console.log(categorias)

    return (
        <div>
            {categorias.map((category) => {
                return (
                    <Link key={category._id} to={`/category/${category._id}`} class="title1">
                        <div class="card container-fluid category">
  <img src={category.image.url} class="card-img-top imagen" alt="..."/>
  <div class="card-body">
    <h4 class="title">{category.title}</h4>
  </div>
</div>
                        
                        
                        
                        </Link>)})}

                       
                    
                   
                    


                    </div>
                )
            }

export default Categories