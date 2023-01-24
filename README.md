# proyectofinal

<body>
<h1>E-COMMERCE _FUSCA HOUSE</h1>
<h2>Proyect Description:</h2>
<p>Fusca House is an e-commerce project, created from scratch, of home decoration and furniture products.  I performed the Development and construction of the Back and Frontend of my application (e-commerce).
</p>

<h2>Main Technologies used:</h2>
<ul>
 <li><img src="./imagenes/mern-stack-01.png"  style="width:180px; height:130px; text-align:center"></img></li>
 <p>MONGODB, EXPRESS, REACTjs, NODEjs</p>
 <br>
 <li><img src="./imagenes/logos.png"  style="width:180px; height:70px; text-align:center"></img></li>
 <p>HTML, CSS, JAVASCRIPT</p>
</ul>

<h3>Others:</h3>
<ul>
<li><img src="./imagenes/GitHub-logo.png"  style="width:60px; height:40px; text-align:center"></img></li>
<li><img src="./imagenes/Bootstrap_logo.png"  style="width:50px; height:50px; text-align:center"></img></li>
<li><img src="./imagenes/cloudinary.png"  style="width:50px; height:50px; text-align:center"></img></li>
<li><img src="./imagenes/postman.png"  style="width:50px; height:50px; text-align:center"></img></li>
<li><img src="./imagenes/figma.png"  style="width:70px; height:50px; text-align:center"></img></li>
</ul>


<h2>Application functionalities:</h2>
<h4>It is not necessary to be registered as a user to view all categories and products, but it is necessary if you want to add products to your cart, make a payment and check all orders.</h4>
<div>
<h3>Registration and Login System</h3>
<h4>To be able to register:</h4>
<p>.post(/register) = Public route for user registration </p>
<p>Process:</p>
<ol>
 <li>The user must enter first name, a valid email and create a password.</li>
 <li>Email verification to check that is not already registered in the Database and that complies with the format</li>
 <li>Password verification (must meet requirements, e.g. minimum 6 characters)</li>
 <li>Password encryption</li>
 <li>Token Key Creation</li>
</ol>
<h4>To be able to log in:</h4>
<p>.post(/login) = Public route for the user to login</p>
<p>Process:</p>
<ol>
 <li>The user must enter the email and password used to register.</li>
 <li>Authentication of his credentials with the Database.</li>
 <li>Generation of a new token key that gives access to the different functionalities.</li>
</ol>

<h3>User Login Panel</h3>
<p>Routes, accesses and functionalities within the application:</p>
<ul>
 <li>Access to all categories - PUBLIC ROUTE</li>
 <li>Access to all products - PUBLIC ROUTE</li>
 <li>You can add products to your cart - PRIVATE ROUTE</li>
 <li>You can make payments and view all payments made - PRIVATE ROUTE</li>
 <li>Access to all orders - PRIVATE ROUTE</li>
 <li>You can access, modify and delete your profile at any time - PRIVATE ROUTE</li>
</ul>
<h3>Administrator Panel - role assigned in the Database</h3>
<p>Routes (all private), accesses and functionalities within the application:</p>
<ul>
 <li>You will be able to create, access, modify and delete all categories, subcategories and products.</li>
 <li>You can upload and delete images</li>
 <li>Access to all orders and payments made for the store or for a specific user.</li>
 <li>You can access, modify or delete a user's information or profile.</li>
 <li>You can access to all registered users in the store.</li>
 <li>You can assign roles in the database</li>
</ul>
</div>
<br>
<h2>BACK-END ARQUITECTURE</h2>
<p>Start and set up a server developed in NODE JS and connect to the database hosted in MONGODB.</p>
<h3>Main dependencies used</h3>
<ul>
 <li>EXPRESS - necessary to create and run the server</li>
 <li>NODEMON - updates the changes in real time visible in the terminal</li>
 <li>MONGOOSE - connects me to and allows me to manage a database in the cloud.</li>
 <li>DOTENV - saves that database to a hidden file (.env)</li>
</ul>

 Commands to start the server => npm run dev

<h3>Secondary dependencies used</h3>
<ul>
 <li>Bcrypt</li>
 <li>JsonWebToken</li>
 <li>Cloudinary</li>
 <li>Fs</li>
 <li>Express-fileupload</li>
</ul>

<h2>DATA MODELS OF MY APPLICATION</h2>

<img src="./imagenes/modelos.png"  style="width:570px; height:500px; text-align:center"></img>

<div>
<h2>ROUTES:</h2>
<p>Server is running con port 5001. Starting end-point: http://localhost:5001/api/"end-point"
All routes testing were done on Postman.</p>

<h3>USER:</h3>
<p>
.post(/register) Route to create an user - PUBLIC ROUTE <br>
.post(/login) Route to log in - PUBLIC ROUTE<br>
.get(/users) Route to access to all registered users - PRIVATE ADMIN ROUTE<br>
.get(/user) Route for the loged in user`s profile - PRIVATE USER ROUTE<br>
.put(/user) Route for the user to modify his profile - PRIVATE USER ROUTE<br>
.delete(/user) Route for the user to delete his account - PRIVATE USER ROUTE<br>
.put(/user/:id) Route for the admin to modify a user - PRIVATE ADMIN ROUTE<br>
.delete(/user/:id) Route for the admin to delete a user - PRIVATE ADMIN ROUTE<br>
.post(/cart) Route to add products to cart - PRIVATE USER ROUTE<br>
.get(/orders) Route to all sales - PRIVATE ADMIN ROUTE<br>
.get(/cart) Route to access the shopping cart - PRIVATE USER ROUTE<br>
</p>

<h3>PRODUCT:</h3>
<p>
.get(/product/:id) Route to view a specific product - PUBLIC ROUTE<br>
.get(/products) Route to view all products - PUBLIC ROUTE<br>
.post(/product) Route to create a product - PRIVATE ADMIN ROUTE<br>
.put(/product/:id) Route to modify a product - PRIVATE ADMIN ROUTE<br>
.delete(product/:id) Route to delete a product - PRIVATE ADMIN ROUTE<br>
.get(/productspro) Route to view all pro products - PRIVATE USER PRO ROUTE<br>
.post(/cart) Route to select and add products to my cart - PRIVATE USER ROUTE
</p>

<h3>CATEGORY:</h3>
<p>
.get(/category/:id) Route to view a specific category - PUBLIC ROUTE<br>
.get(/categories) Route to view all categories - PUBLIC ROUTE<br>
.get(/categoriespro) Route to view all pro categories - PRIVATE USER PRO ROUTE<br>
.post(/category) Route to create a new category - PRIVATE ADMIN ROUTE<br>
.put(/category/:id) Route to modify category - PRIVATE ADMIN ROUTE<br>
.delete(/category/:id) Route to delete category - PRIVATE ADMIN ROUTE
</p>

<h3>SUBCATEGORY:</h3>
<p>
.get(/subcategory/:id) Route to view a subcategory associated to a category - PUBLIC ROUTE<br>
.get(/subcategories) Route to view all subcategories of a specific category - PUBLIC ROUTE<br>
.post(/subcategory/:id) Route to create a subcategory associated to the id of a category - PRIVATE ADMIN ROUTE<br>
.put(/subcategory/:id) Route to modify a subcategory - PRIVATE ADMIN ROUTE<br>
.delete(/subcategory/:id) Route to delete a subcategory - PRIVATE ADMIN ROUTE
</p>

<h3>IMAGE:</h3>
<p>
.post(/upload) Route to upload an image - PRIVATE ADMIN ROUTE<br>
.post(/destroy) Route to delete an image - PRIVATE ADMIN ROUTE
</p>

<h3>PAYMENT:</h3>
<p>
.post(/payment) Route to make a payment - PRIVATE USER ROUTE<br>
.get(/payments) Route to view all payments made - PRIVATE USER ROUTE
</p>
</div>
<br>

<h2>FRONT-END APPLICATION</h2>
<p>Design and Development of the Frontend using REACTjs, hosted on port 3000 and interacting with the database hosted in MONGODB. </p>
<h3>Main dependencies/libraries used:</h3>
<ul>
 <li>AXIOS - allows to make requests or calls to the content of an HTTP link.</li>
 <li>REACT-ROUTER-DOM - facilitates the process of defining navigation routes within our application.</li>
 <li>REACT-DOM - in charge of rendering React components for the browser.</li>
 <li>WEB-VITALS - quality indicators that are essential to provide an excellent user experience on the web.</li>
 <li>REACT-HOOKS - useState & useEffect</li>
 <li>REACT-BOOTSTRAP - CSS framework for proper styles of React</li>
</ul>

 Commands to run local server on front side => npm start

 <h2>ROUTES & COMPONENTS:</h2>
<p>Local Server is hosted con port 3000. Starting end-point: http://localhost:3000/"end-point"</p>
<div>
<p>Navbar and Footer components are rendered in all routes</p>
<p>
- Route path="/" render {Home.jsx} Component<br>
- Route path="/login" render {Login.jsx} Component<br>
- Route path="/logout" render {Logout.jsx} Component<br>
- Route path="/new_user" render {Register.jsx} Component<br>
- Route path="/my_profile" render {User.jsx} Component<br>
- Route path="/edit_myprofile" render {EditProfile.jsx} Component<br>
- Route path="/edit_user/:userId" render {EditUser.jsx} Component<br>
- Route path="/all_users" render {Users.jsx} Component<br>
- Route path="/new_in" render {NewIn.jsx} Component<br>
- Route path="/new_product" render {NewProduct.jsx} Component<br>
- Route path="/edit_product/:productId" render {EditProduct.jsx} Component<br>
- Route path="/product/:productId" render {Product.jsx} Component<br>
- Route path="/all_products" render {Products.jsx} Component<br>
- Route path="/new_category" render {NewCategory.jsx} Component<br>
- Route path="/all_categories" render {Categories.jsx} Component<br>
- Route path="/category/:categoryId" render {Category.jsx} Component<br>
- Route path="/edit_category/:categoryId" render {EditCategory.jsx} Component<br>
- Route path="/subcategory/:subcategoryId" render {Subcategory.jsx} Component<br>
- Route path="/new_subcategory/:categoryId" render {NewSubcategory.jsx} Component<br>
- Route path="/edit_subcategory/:subcategoryId" render {EditSubcategory.jsx} Component<br>
</p>  
</div>