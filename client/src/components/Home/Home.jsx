import React from "react";
import carusel1 from "../imagenes/fotoproducto9.jpg"
import carusel2 from "../imagenes/carusel2.jpg"
import carusel3 from "../imagenes/carusel3.jpg"
import carusel4 from "../imagenes/carusel4.jpg"
import foto from "../imagenes/IMG_0870.jpg"
// import axios from "axios";
// import { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import NewIn from "./NewIn";

const Home = () => {


  return (
    <div>
      <div id="carouselExampleControls" class="carousel slide carusel" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={carusel1} class="d-block w-100" alt="" />
          </div>
          <div class="carousel-item">
            <img src={carusel2} class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src={carusel3} class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src={carusel4} class="d-block w-100" alt="..." />
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div class="box">
        <div>
          <a
            className="nav-link active new"
            href="/new_in"
            role="button"
          >
            NEW IN
          </a>
          <img src={foto} alt="" class="newinFoto" />
          </div>
          {/* <div>
          <a
            className="nav-link active sale"
            href="/new_in"
            role="button"
          >
            SALE
          </a>
          </div> */}
        </div>
        

      

      <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">

        <div class="carousel-inner">
          <h2 class="titulo">ESPACIOS BY FUSCA</h2>
          <div class="carousel-item active">
            <img src={carusel4} class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src={carusel3} class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src={carusel1} class="d-block w-100" alt="..." />
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>

      </div>
    </div>
  )
}

export default Home