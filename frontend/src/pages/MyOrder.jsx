import { Box,Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";


function MyOrders({setPage}){

    const [orders , setOrders]=useState([]);
    const [products, setProducts]=useState([]);

    const getOrders=async()=>{

        try{
            const token=localStorage.getItem("token");

            const response=await fetch("http://localhost:3000/orders/get",{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });

            const data= await response.json();
            console.log(data);

            if(response.ok){
                setOrders(data.data);
            }
        }
        catch(error){
            console.log("Error getting ordrs:",error);
        }

    };


const getProducts = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:3000/user/products",
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      setProducts(data.data);
    }

  } catch (error) {
    console.log("Error getting products:", error);
  }
};
    
    useEffect(()=>{
        getOrders();
        getProducts();
    },[]);

   
    return(
      <Box sx={{minHeight:"100vh",p:{xs:2,sm:4},bgcolor:"#f5f5f5"}}>

        <Typography variant="h4" sx={{mb:1,fontWeight:"bold"}}>My Orders</Typography>

        {orders.length===0 ? (
          <Box sx={{bgcolor:"white",p:4,borderRadius:3
            ,boxShadow:1,textAlign:"center"
          }}>
            <Typography variant="h6" >No order found</Typography>

            <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => setPage("products")}
          >
            Add another product
          </Button>
        </Box>
        ):(
            orders.map((order) => {

    const product = products.find(
        (item) => item._id === order.productId
    );

    return (
        <Box key={order._id} sx={{ mt: 2,p:3,bgcolor:"white",borderRadius:3,boxShadow:1 }}>

            <Typography variant="h6" sx={{mb:2}}>
                Order Id: {order._id}
            </Typography>

            <Typography variant="h6" sx={{fontWeight:"bold",mt:1}}>
                Product: {product ? product.name : "Product not found"}
            </Typography>

            <Typography sx={{mt:1}}>
                Quantity: {order.quantity}
            </Typography>

            <Typography sx={{mt:1,fontWeight:"bold"}}>
                Total Price: ₹{order.totalPrice}
            </Typography>

            <Typography sx={{mt:1,color:"text.secondary"}}>
          Status: {order.status || "pending"}
           </Typography>

          {order.status !== "shipped" &&
 order.status !== "delivered" &&
 order.status !== "canceled" && (
  <Button
    variant="outlined"
    color="error"
    sx={{ mt: 2 }}
    onClick={async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:3000/orders/cancel/${order._id}`,
          {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        console.log(data);

        if(response.ok){
            getOrders();
        }


      } catch (error) {
        console.log("Error canceling order:", error);
      }
    }}
  >
    Cancel Order
  </Button>
)}
        </Box>
    );
})
        )}


        <Button
        variant="outlined"
        sx={{ mt: 3 }}
        onClick={() => setPage("user")}
      >
        Back to Home
      </Button>

      </Box>
    );

}

export default MyOrders;