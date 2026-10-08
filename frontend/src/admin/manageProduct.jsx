import {Box, Button, Typography,Select,MenuItem,TextField,FormControl,InputLabel } from "@mui/material";
import { useEffect,useState } from "react";


function ManageProduct({setPage}){

    const [products,setProducts]=useState([]);
    const [showForm,setshowForm]=useState(false);

    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [description,setDescription]=useState("");
    const [productTypes,setProductTypes]=useState([]);
    const [productTypeId,setProductTypeId]=useState("");

    //editing
    const [edit,setEdit]=useState(null);

//fetching products
    const getProducts=async ()=>{
        try{
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/products",{
            method:"GET",
            headers:{
                "Authorization":`bearer ${token}`
            }
        });
        const data =await response.json();
        console.log(data);
        if(response.ok){
            setProducts(data.data);
        }
    }

catch(error){
    console.log("error getting products:",error);
}}

useEffect(()=>{
    getProducts();
    getProductTypes();
},[]);

//fetching product types
const getProductTypes = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:3000/product-types",
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
      setProductTypes(data.data);
    }
  } catch (error) {
    console.log("Error getting product types:", error);
  }
};

//adding products
const addProduct= async()=>{
    try{
        const token=localStorage.getItem("token");
        const response=await fetch("http://localhost:3000/products",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({
                name:name,
                price:price,
                description:description,
                productTypeId:productTypeId
            })
        });
        const data = await response.json();
        console.log(data);
        if(response.ok){
            setshowForm(false);
            setName("");
            setPrice("");
            setDescription("");
            setProductTypeId("");
            getProducts();
        }
    }catch(error){
     console.log("error adding product:",error);
    }
};

//updating the products

const updateProduct=async ()=>{
    try{
        const token=localStorage.getItem("token");
        const response=await fetch(`http://localhost:3000/products/${edit}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({
                name,price,
                description,productTypeId
            })
        });
        const data= await response.json();
        console.log(data);
        if(response.ok){
            setName("");
            setPrice("");
            setDescription("");
            setProductTypeId("");
            setEdit(null);
            setshowForm(false);
            getProducts();
        }
    }
    catch(error){
        console.log("Error updating product:",error);
    }
};

//return function
    return(
        <Box sx={{minHeight:"100vh",p:{xs:2,sm:4},bgcolor:"#f5f5f5"}}>

        <Typography variant="h4" sx={{mb:1,fontWeight:"bold",textAlign:"center"}}>Manage Products</Typography>
        
<Box sx={{display:"flex",justifyContent:"center"}}>
<Button variant="contained" onClick={()=>
    {setEdit(null);
     setName("");
     setPrice("");
     setDescription("");
     setProductTypeId("");
    setshowForm(true)}} sx={{mt:2,mb:3}}>Add product</Button>
</Box>
{showForm && (
    <Box sx={{mt:3,p:3,bgcolor:"white",borderRadius:3,boxShadow:2,maxWidth:500,mx:"auto"}}>
 
      <Typography variant="h5" sx={{mb:3,fontWeight:"bold"}}>Add product</Typography>

      <TextField fullWidth label="Product name" value={name} 
      onChange={(e)=>setName(e.target.value)} sx={{mt:1}}/>
      <br/>

      <TextField fullWidth type="number" label=" price" value={price} 
      onChange={(e)=>setPrice(e.target.value)} sx={{mt:2}}/>
      <br />

      <TextField  fullWidth label="description" multiline rows={3} value={description} 
      onChange={(e)=>setDescription(e.target.value)} sx={{mt:2}}/>
      <br />
    
    <FormControl fullWidth sx={{mt:2}}>
     <InputLabel>Product Type</InputLabel>
     <Select 
      value={productTypeId}
      onChange={(e) => setProductTypeId(e.target.value)}
      displayEmpty
      sx={{ mt: 2 }}
    >
      <MenuItem value="" disabled >
        Select Product Type
      </MenuItem>
    
      {productTypes.map((type) => (
        <MenuItem key={type._id} value={type._id}>
          {type.name}
        </MenuItem>
      ))}
    </Select>
    </FormControl>


      <br/>
   <Box sx={{mt:3}}>
      <Button variant="contained" sx={{mt:2}}
      onClick={edit? updateProduct : addProduct} >
        {edit? "Edit":"Add"} </Button>
</Box>
    </Box>
)}


        {products.map((product)=>(
            <Box key={product._id} sx={{mt:2,p:2,bgcolor:"white",borderRadius:2,boxShadow:1
            }}>

            <Typography variant="h6" sx={{fontWeight:"bold"}}>Product: {product.name}</Typography>
            <Typography sx={{mt:1}}>Price: ₹{product.price}</Typography>

<Box sx={{mt:2}}>
            <Button variant="outlined"
            sx={{mt:1}}
            onClick={()=>{
                setEdit(product._id);
                setName(product.name);
                setPrice(product.price);
                setDescription(product.description);
                setProductTypeId(product.productTypeId);
                setshowForm(true);
            }}
            >Edit</Button>

            <Button variant="outlined"
              color="error"
              sx={{mt:1,ml:1}}
              onClick={async()=>{
                try{
                    const token=localStorage.getItem("token");
                    const response=await fetch(`http://localhost:3000/products/${product._id}`,{
                        method:"DELETE",
                        headers:{
                            "Authorization":`Bearer ${token}`
                        }
                    });
                    const data=await response.json();
                    console.log(data);
                    if(response.ok){
                        getProducts();
                    }
                }
                catch(error){
                    console.log("Error deleting products:",error);
                }

              }}            
            >Delete</Button>
</Box>
            </Box>
        ))}

         <Button
        variant="outlined"
        onClick={()=>setPage("admin")}
        sx={{mt:2}}
        > Back to Dashboard</Button>

        </Box>
    );

}

export default ManageProduct;