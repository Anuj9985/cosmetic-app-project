import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Productdetail from "./pages/Productdetail";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import MyOrders from "./pages/MyOrder";
import AdminDashboard from "./admin/adminDashboard";
import ManageOrders from "./admin/manageOrders";
import ManageProduct from "./admin/manageProduct";
import ManageProductCategories from "./admin/manageProductCategories";


function App() {

  const [page, setPage] = useState("signup");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart,setCart]=useState([]);
  const [selectedProductType, setSelectedProductType] = useState(null);

  return (
    <div>

      {page === "login" && (
        <Login setPage={setPage}/>
      )}

      {page === "signup" && (
        <Signup setPage={setPage}/>
      )}
{/* user */}
      {page==="user" && (
        <Home
         setPage={setPage}
         setSelectedProductType={setSelectedProductType}
       />
             )}

      {page === "products" && (
      <Products
         setPage={setPage}
         setSelectedProduct={setSelectedProduct}
         selectedProductType={selectedProductType}
         cart={cart}
         setCart={setCart}
       />
     )}

      {page === "productdetail" && (
        <Productdetail
          setPage={setPage}
          product={selectedProduct}
          cart={cart}
          setCart={setCart}
        />
      )}
      {page==="cart" && (
        <Cart  setPage={setPage}
        cart={cart}
        setCart={setCart}/>
      )}

      {page === "order" && (
  <Order
    setPage={setPage}
    cart={cart}
    setCart={setCart}
  />
)}

{page==="myorders" && (
  <MyOrders setPage={setPage}/>
)}


{/* admin */}
      {page==="admin"&& (
        <AdminDashboard setPage={setPage}/>
      )}

      {page=="manageOrders" &&(
        <ManageOrders setPage={setPage}/>
      )}

{page==="manageProduct" && (
  <ManageProduct setPage={setPage}/>
)}

{page==="manageProductType" &&(
  <ManageProductCategories setpage={setPage}/>
)}
      

    </div>
  );
}

export default App;