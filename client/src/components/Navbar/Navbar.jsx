import React from "react";
import LogoFusca from "../imagenes/logo_nuevo9.png"
import LogoAdmin from "../imagenes/byfusca.png"
// import { useEffect, useState } from "react;
// import axios from "axios";
import { FiUser } from "react-icons/fi"
import {CiUser} from "react-icons/ci"
import { CiSearch } from "react-icons/ci"
import { BsBag } from "react-icons/bs"


const Navbar = () => {
  const role = localStorage.getItem("role")

  // USER NO LOGUEADO
  const Nav1 = () => {

    return (
      <div>
        <header class="header">
          <nav class="navbar fixed-top navUser">
            <div class="container-fluid">
              <a className="navbar-brand" href="/">
                <img
                  src={LogoFusca}
                  alt=""
                  class="position-absolute top-0 start-50 translate-middle-x logo"
                />
              </a>
              <button
                class="position-absolute top-0 start-0 navbar-toggler-icon boton_toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >

              </button>
              <div class="collapse navbar-collapse navdesplegada" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/">Home</a>
                  </li>
                  <div class="dropdown">
                    <a class="nav-link dropdown-toggle" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Categorias
                    </a>

                    <ul class="dropdown-menu drop">
                      <li><a class="dropdown-item" href="/all_categories">Todas las categorias</a></li>
                      <li><a class="dropdown-item" href="#">Almohadones</a></li>
                      <li><a class="dropdown-item" href="#">Mantas</a></li>
                      <li><a class="dropdown-item" href="#">Muebles y Sillas</a></li>
                    </ul>
                  </div>
                  <li class="nav-item">
                    <a class="nav-link" href="/all_products">Productos</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">About Us</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="">Contacto</a>
                  </li>
                </ul>
                <div class="navdown">
                  <ul class="navbar-nav">
                    <li class="nav-item">
                      <a class="nav-link" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/new_user">Crear Cuenta</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/">Buscar</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="">EN - SP</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="container-fluid">
              <div class="btn group position-absolute top-0 end-0 user">
                <a class="btn user" type="button" href="/login">
                  <CiUser className="icono" />
                </a>

              </div>
              <div class="btn group dropstart position-absolute top-0 end-0 search">
                <button class="btn search" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <CiSearch className="icono" />
                </button>
                <ul class="dropdown-menu drop3">
                  <input class="lupa" type="text" placeholder="¿Qué estás buscando?" />
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
    )
  }

  // USER LOGUEADO
  const NavUser = () => {
    return (
      <div>
        <header class="header">
          <nav class="navbar navUser bg-light fixed-top">
            <div class="container-fluid">
              <a className="navbar-brand" href="/">
                <img
                  src={LogoFusca}
                  alt=""
                  class="position-absolute top-0 start-50 translate-middle-x logo"
                />
              </a>
              <button
                class="position-absolute top-0 start-0 menu navbar-toggler-icon boton_toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >

              </button>
              <div class="collapse navbar-collapse navdesplegada container-fluid" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a class="nav-link" href="/">Home</a>
                  </li>
                  <div class="dropdown">
                    <a class="nav-link dropdown-toggle" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Categorias
                    </a>

                    <ul class="dropdown-menu drop">
                      <li><a class="dropdown-item" href="/all_categories">Todas las categorias</a></li>
                      <li><a class="dropdown-item" href="#">Almohadones</a></li>
                      <li><a class="dropdown-item" href="#">Mantas</a></li>
                      <li><a class="dropdown-item" href="#">Muebles y Sillas</a></li>
                    </ul>
                  </div>
                  <li class="nav-item">
                    <a class="nav-link" href="/all_products">Productos</a>
                  </li>
                  <div class="dropdown">
                    <a class="nav-link dropdown-toggle" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Mi Cuenta
                    </a>

                    <ul class="dropdown-menu drop">
                      <li><a class="dropdown-item" href="/my_profile">Ver mi perfil</a></li>
                      <li><a class="dropdown-item" href="/my_profile">Mis Pedidos</a></li>
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li><a class="dropdown-item" href="/logout">Cerrar Sesión</a></li>

                    </ul>
                  </div>
                  <li class="nav-item">
                    <a class="nav-link" href="#">About Us</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="">Contacto</a>
                  </li>
                </ul>
                <div class="navdown">
                  <ul class="navbar-nav">
                    <li class="nav-item">
                      <a class="nav-link" href="/">Carrito</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/">Buscar</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="">EN - SP</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/logout">Cerrar Sesión</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div >
              <div class="btn group position-absolute top-0 end-0 user">
                <a class="btn carrito" type="button" href="/my_profile">
                  <BsBag className="cart" />
                </a>
              </div>
              <div class="btn group dropstart position-absolute top-0 end-0 search">
                <button class="btn search" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <CiSearch className="lupa" />
                </button>
                <ul class="dropdown-menu drop3">
                  <input class="input" type="text" placeholder="¿Qué estás buscando?" />
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
    )
  };


  // ADMIN 
  const NavAdmin = () => {
    return (
      <div>
        <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#">Navbar</a>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
      </div>
    )

  }

{/* <div class="container-fluid">
        <nav class="navbar bg-light fixed-top">
          <div>
            <a href="/">
              <img src={LogoAdmin} alt="" class="navbar-brand logoAdmin" />
            </a>
            <div class="offcanvas-header">
                <h5 class="offcanvas-title admin" id="offcanvasNavbarLabel">ADMINISTRADOR</h5>
              </div>
                    <a class="nav-item" href="/my_profile">Admin</a>
                  
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div class="offcanvas-header">
                <h5 class="offcanvas-title panel" id="offcanvasNavbarLabel">Panel Administrador</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/my_profile">Ventas</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/all_users">Clientes</a>
                  </li>
                  <li>
                    <hr class="divider" />
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Productos
                    </a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="/all_products">Todos los productos</a></li>
                      <li><a class="dropdown-item" href="/new_product">Agregar un producto</a></li>

                    </ul>
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Categorias
                    </a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="/all_categories">Todas las categorias</a></li>
                      <li><a class="dropdown-item" href="/new_category">Agregar una categoria</a></li>
                    </ul>
                  </li>
                  <li>
                    <hr class="divider" />
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/my_profile">Preferencias de Usuario</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="/logout">Cerrar Sesión</a>
                    </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/my_profile">Configuración</a>
                  </li>
                  <li>
                    <hr class="divider" />
                  </li>
                </ul>
                
                <form class="d-flex mt-3" role="search">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
              </div>
            </div>
          </div>
        </nav>
      </div> */}

  // let navbar = role == 0 ? NavUser() : NavAdmin()

  // let nav = role == 0 ? NavUser() : role == 1 ? NavPro() : role == 2 ? NavAdmin : Nav1()    //dentro de una variable guardo una condicion ternaria (funciona como un if/else)
  // if role es igual a 0, muestrame navUser, SINO, if el role es igual a 1, muestrame navPro, if el role es igual a 2, muestrame navAdmin, pero (ELSE) si no es igual a ninguno(sin rol), muestrame Nav1
  return (
    <div>
      {/* {nav} */}
      {role == 0 ? NavUser() : role == 2 ? NavAdmin() : Nav1()}
    </div>
  )
};

export default Navbar;
