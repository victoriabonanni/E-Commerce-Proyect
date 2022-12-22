import React from "react";
import Logofusca from "../imagenes/logo_nuevo9.png"

const Footer = ()=>{

    return(
    <div>
    
       <footer class="footer-bs">
       
        <div class="row">
        
        	<div class="col-md-3 footer-brand animated fadeInLeft">
            <img src={<Logofusca/>} alt="" />
            </div>
            <div class="col-md-3 footer-ns animated fadeInRight">
            	<h4>Newsletter</h4>
                <p>Suscribete y recibe todas nuestras ofertas</p>
                <p>
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="Email"/>
                      <span class="input-group-btn">
                        <button class="btn btn-default" type="button"><span class="glyphicon glyphicon-envelope"></span></button>
                      </span>
                    </div>
                 </p>
            </div>
        	
            	{/* <div class="col-md-6">
                    <ul class="list">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contacts</a></li>
                        <li><a href="#">Terms & Condition</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div> */}
            </div>
        	<div class="col-md-2 footer-social animated fadeInDown">
            	<h4>Follow Us</h4>
            	<ul>
                	<li><a href="#">Facebook</a></li>
                	<li><a href="#">Twitter</a></li>
                	<li><a href="#">Instagram</a></li>
                	
                </ul>
            </div>
          
        	</footer>
            
        </div>
 
    


       
    )
}

export default Footer