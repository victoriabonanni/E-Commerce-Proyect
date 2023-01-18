import React from "react";
import Logofusca from "../imagenes/logo_nuevo9.png"
import {ImWhatsapp} from "react-icons/im"

const Footer = ()=>{

    return(
        <div>
           
<footer class="bg-dark text-center text-white">
  
  <div class="container p-4">
    
    <section class="mb-4">
      
      <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
        >{ImWhatsapp}
      </a>

      
      <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
        ><i class="fab fa-twitter"></i
      ></a>

      
      <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
        ><i class="fab fa-google"></i
      ></a>

     
      <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
        ><i class="fab fa-instagram"></i
      ></a>

     
      <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
        ><i class="fab fa-linkedin-in"></i
      ></a>

      
      <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
        ><i class="fab fa-github"></i
      ></a>
    </section>
    

   
    <section class="">
      <form action="">
        
        <div class="row d-flex justify-content-center">
         
          <div class="col-auto">
            <p class="pt-2">
              <strong>Sign up for our newsletter</strong>
            </p>
          </div>
         

          
          <div class="col-md-5 col-12">
           
            <div class="form-outline form-white mb-4">
              <input type="email" id="form5Example21" class="form-control" placeholder="Email address"/>
              
            </div>
          </div>
          

         
          <div class="col-auto">
            
            <button type="submit" class="btn btn-outline-light mb-4">
              Subscribe
            </button>
          </div>
          
        </div>
        
      </form>
    </section>
    
    <section class="mb-4">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum
        repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam
        eum harum corrupti dicta, aliquam sequi voluptate quas.
      </p>
    </section>
    
    <section class="">
     
      <div class="row">
       
        
       
        <div class="col-x">
          <h5 class="text-uppercase">Links</h5>

          <ul class="list-unstyled mb-0">
            <li>
              <a href="#!" class="text-white">Link 1</a>
            </li>
            <li>
              <a href="#!" class="text-white">Link 2</a>
            </li>
            <li>
              <a href="#!" class="text-white">Link 3</a>
            </li>
            <li>
              <a href="#!" class="text-white">Link 4</a>
            </li>
          </ul>
        </div>
       
       
        
       
        
      </div>
      
    </section>
    
  </div>
  

  
  <div class="text-center p-3">
    © 2016 Copyright: FUSCA HOUSE
  </div>
  
</footer>

        </div>
    
 
    


       
    )
}

export default Footer

// <div>
    
    //    <footer class="footer-bs">
       
    //     <div class="row">
        
    //     	<div class="col-md-3 footer-brand animated fadeInLeft">
    //         <img src={<Logofusca/>} alt="" />
    //         </div>
    //         <div class="col-md-3 footer-ns animated fadeInRight">
    //         	<h4>Newsletter</h4>
    //             <p>Suscribete y recibe todas nuestras ofertas</p>
    //             <p>
    //                 <div class="input-group">
    //                   <input type="text" class="form-control" placeholder="Email"/>
    //                   <span class="input-group-btn">
    //                     <button class="btn btn-default" type="button"><span class="glyphicon glyphicon-envelope"></span></button>
    //                   </span>
    //                 </div>
    //              </p>
    //         </div>
        	
    //         	{/* <div class="col-md-6">
    //                 <ul class="list">
    //                     <li><a href="#">About Us</a></li>
    //                     <li><a href="#">Contacts</a></li>
    //                     <li><a href="#">Terms & Condition</a></li>
    //                     <li><a href="#">Privacy Policy</a></li>
    //                 </ul>
    //             </div> */}
    //         </div>
    //     	<div class="col-md-2 footer-social animated fadeInDown">
    //         	<h4>Follow Us</h4>
    //         	<ul>
    //             	<li><a href="#">Facebook</a></li>
    //             	<li><a href="#">Twitter</a></li>
    //             	<li><a href="#">Instagram</a></li>
                	
    //             </ul>
    //         </div>
          
    //     	</footer>
            
    //     </div>