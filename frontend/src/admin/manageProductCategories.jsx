import { Box,Button, Typography,TextField } from "@mui/material";
import { useEffect, useState } from "react";


function ManageProductCategories({setpage}){

    const [productTypes,setProductTypes]=useState([]);
    const [showForm, setShowForm] = useState(false);
    const [typeName, setTypeName] = useState("");
    const [edit,setEdit]=useState(null);
    


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

    useEffect(()=>{
        getProductTypes();
    },[])

//adding product type
const addProductType = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:3000/product-types",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: typeName
        })
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      setTypeName("");
      setShowForm(false);
      getProductTypes();
    }

  } catch (error) {
    console.log("Error adding product type:", error);
  }
};

//updating the product type

const updateProductType=async()=>{
  try{
    const token=localStorage.getItem("token");
    const response=await fetch(`http://localhost:3000/product-types/${edit}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({
        name:typeName
      })
    });
    const data = await response.json();
    console.log(data);
    if(response.ok){
      setTypeName("");
      setEdit(null);
      setShowForm(false);
      getProductTypes();
    }
  }
  catch(error){
    console.log("Error updating product type:",error);
  }
};

    return(
        <Box sx={{minHeight:"100vh",p:{xs:2,sm:4},bgcolor:"#f5f5ff5"}}>
         
         <Typography variant="h4" sx={{mb:1,fontWeight:"bold",textAlign:"center"}}>Manage Product Types</Typography>
<Box sx={{display:"flex",justifyContent:"center"}}>
         <Button
           variant="contained"
           onClick={() => {
            setEdit(null);
            setTypeName("");
            setShowForm(true)}}
           sx={{ mt: 2, mb: 2 }}
         >
            Add Product Type
         </Button>
         </Box>

         {showForm && (
           <Box sx={{ mt: 3,p:3,bgcolor:"white",borderRadius:3,boxShadow:2,maxWidth:500,mx:"auto" }}>
         
             <Typography variant="h5">
               {edit ?"Edit Product Type":"Add Product Type"}
             </Typography>
         
             <TextField
               fullWidth
               label="Product type name"
               value={typeName}
               onChange={(e) => setTypeName(e.target.value)}
               sx={{mt:1}}
             />
             <br/>
             <Button
           variant="contained"
           sx={{ mt: 2,px:3 }}
           onClick={edit? updateProductType : addProductType}
         >
           {edit?"Edit":"Add"}
         </Button>
         
           </Box>
         )}

         
     {productTypes.map((type) => (
       <Box key={type._id} sx={{ mt: 2,p:2,bgcolor:"white",borderRadius:2,
          boxShadow:1,display:"flex",justifyContent:"space-between",
          alignItems:"center",flexWrap:"wrap",gap:2
        }}>
     
         <Typography>
           Product Type: {type.name}
         </Typography>
     
         <Button
           variant="outlined"
           sx={{ mt: 1 }}
           onClick={() => {
            setEdit(type._id);
             setTypeName(type.name);
             setShowForm(true);
           }}
         >
           Edit
         </Button>

         <Button
          variant="outlined"
          color="error"
          sx={{ mt: 1, ml: 1 }}
          onClick={async () => {
            try {
              const token = localStorage.getItem("token");
        
              const response = await fetch(
                `http://localhost:3000/product-types/${type._id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Authorization": `Bearer ${token}`
                  }
                }
              );
        
              const data = await response.json();
        
              console.log(data);
        
              if (response.ok) {
                getProductTypes();
              }
        
            } catch (error) {
              console.log("Error deleting product type:", error);
            }
          }}
        >
          Delete
        </Button>
     
       </Box>
     ))}

         <Button
         variant="outlined"
         onClick={()=>setpage("admin")}
         sx={{mt:2}}
         >Back to Dashboard</Button>

        </Box>
    );

}

export default  ManageProductCategories;