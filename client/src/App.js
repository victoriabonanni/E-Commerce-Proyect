import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Auth/Login/Login';
import Register from "./components/Auth/Register/Register"
import User from './components/User/User';
import EditUser from './components/User/EditUser';
import Logout from './components/Auth/Logout/Logout';
import Product from './components/Products/Product';
import Products from './components/Products/Products';
import NewProduct from './components/Products/NewProduct';
import EditProduct from './components/Products/EditProduct';
import Category from './components/Category/Category';
import Categories from './components/Category/Categories';
import NewCategory from './components/Category/NewCategory';
import EditCategory from './components/Category/EditCategory';
import Subcategory from './components/Subcategory/Subcategory';
import NewSubcategory from './components/Subcategory/NewSubcategory';
import EditSubcategory from './components/Subcategory/EditSubcategory';
import NewIn from './components/Home/NewIn';
import Footer from './components/Footer/Footer';
import Users from './components/User/Users';
import EditProfile from './components/User/EditProfile';

const App = ()=> {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/new_user" element={<Register/>}/>
        <Route path="/my_profile" element={<User/>}/>
        <Route path="/edit_myprofile" element={<EditProfile/>}/>
        <Route path="/edit_user/:userId" element={<EditUser/>}/>
        <Route path="/all_users" element={<Users/>}/>
        <Route path="/new_in" element={<NewIn/>}/>
        <Route path="/new_product" element={<NewProduct/>}/>
        <Route path="/edit_product/:productId" element={<EditProduct/>}/>
        <Route path="/product/:productId" element={<Product/>}/>
        <Route path="/all_products" element={<Products/>}/>
        <Route path="/new_category" element={<NewCategory/>}/>
        <Route path="/all_categories" element={<Categories/>}/>
        <Route path="/category/:categoryId" element={<Category/>}/>
        <Route path="/edit_category/:categoryId" element={<EditCategory/>}/>
        <Route path="/subcategory/:subcategoryId" element={<Subcategory/>}/>
        <Route path="/new_subcategory/:categoryId" element={<NewSubcategory/>}/>
        <Route path="/edit_subcategory/:subcategoryId" element={<EditSubcategory/>}/>
        <Route path="/logout" element={<Logout/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
  
    </div>
  );
}
//end point es diferente del end point del back

export default App;
