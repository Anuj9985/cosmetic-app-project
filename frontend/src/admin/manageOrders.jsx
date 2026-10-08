import { Box, Typography,Button, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";


function ManageOrders({setPage}){

    const [orders ,setOrders]=useState([]);
    const [products,setProducts]=useState([]);

    const getOrders=async()=>{

        try{
            const token= localStorage.getItem("token");
            const response=await fetch("http://localhost:3000/orders/admin/all",{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
            const data=await response.json();
            console.log(data);
            if(response.ok){
                setOrders(data.data);
            }
        }
        catch(error){
            console.log("error getting orders:",error);
        }
    };


const getProducts=async()=>{
  try{
    const token=localStorage.getItem("token");

    const response=await fetch("http://localhost:3000/user/products",{
      method:"GET",
      headers:{
        "Authorization":`Bearer ${token}`
      }
    });
    const data = await response.json();
    console.log(data);

    if(response.ok){
      setProducts(data.data);
    }

  }
  catch(error){
    console.log("Error in getting products:",error);
  }
}

useEffect(()=>{
        getOrders();
        getProducts();
    },[]);


    return(
        <Box sx={{minHeight:"100vh", p:{xs:2,sm:4},bgcolor:"#f5f5f5"}}>
            <Typography variant="h4" sx={{mb:1,fontWeight:"bold",textAlign:"center"}}>Manage Orders</Typography>

            {orders.map((order) => {

  const product = products.find(
    (item) => item._id === order.productId
  );

  return (
    <Box key={order._id} sx={{ mt: 2,p:3,bgcolor:"white",borderRadius:3,boxShadow:1 }}>

      <Typography variant="h6" sx={{fontWeight:"bold"}}>
        Order Id: {order._id}
      </Typography>

      <Typography sx={{mt:1}}>
        User Id: {order.userId}
      </Typography>

      <Typography sx={{mt:1}}>
        Product: {product ? product.name : "Product not found"}
      </Typography>

      <Typography sx={{mt:1}}>
        Quantity: {order.quantity}
      </Typography>

      <Typography sx={{mt:1}}>
        Total Price: ₹{order.totalPrice}
      </Typography>

      <Typography sx={{mt:1,fontWeight:"bold"}} >
        Status: {order.status || "pending"}
      </Typography>

      <Select
        value={order.status || "pending"}
        onChange={async (e) => {
          try {
            const token = localStorage.getItem("token");

            const response = await fetch(
              `http://localhost:3000/orders/${order._id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                  status: e.target.value
                })
              }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {
              getOrders();
            }

          } catch (error) {
            console.log("Error updating order:", error);
          }
        }}
        sx={{
          mt: 2,
          minWidth: {xs:"100%",sm:150},
          bgcolor: "white"
        }}
      >
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="processing">Processing</MenuItem>
        <MenuItem value="shipped">Shipped</MenuItem>
        <MenuItem value="delivered">Delivered</MenuItem>
        <MenuItem value="canceled">Canceled</MenuItem>
      </Select>

      {order.status !== "shipped" &&
 order.status !== "delivered" &&
 order.status !== "canceled" && (
  <Button
    variant="outlined"
    color="error"
    sx={{ mt: 2, ml:{xs:0,sm:2} }}
    onClick={async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:3000/orders/admin/cancel/${order._id}`,
          {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        console.log(data);

        if (response.ok) {
          getOrders();
        }

      } catch (error) {
        console.log("Error cancelling order:", error);
      }
    }}
  >
    Cancel Order
  </Button>
)}


    </Box>
  );
})}

<Button
  variant="outlined"
  onClick={() => setPage("admin")}
  sx={{ mt: 4 }}
>
  Back to Dashboard
</Button>

        </Box>
    );
}

export default ManageOrders;