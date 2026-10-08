// import { useEffect, useState } from "react";
// import {  Box, Typography, Button } from "@mui/material";
// import Productcard from "../component/Productcard";

// function Products({ setPage, setSelectedProduct }) {

//   const [products, setProducts] = useState([]);

//   const getProducts = async () => {

//     try {

//       const token = localStorage.getItem("token");

//       const response = await fetch("http://localhost:3000/user/products", {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       console.log(data);

//       if (response.ok) {
//         setProducts(data.data);
//       }

//     } catch (error) {
//       console.log("Error getting products:", error);
//     }
//   };

//   useEffect(() => {
//     getProducts();
//   }, []);

//   return (
//     <Box sx={{ minHeight:"100vh",p:{xs:2,sm:4},bgcolor:"#f5f5f5"}}>

//       <Typography variant="h4" sx={{mb:1,fontWeight:"bold"}}>
//         Products
//       </Typography>

//       <Typography variant="body1" 
//       sx={{ mb: 3, color: "text.secondary" }} > Explore our collection of beauty and skincare products.
//          </Typography>

//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns:{xs:"1fr",sm:"repeat(2,1fr)",
//               md:"repeat(3,1fr)", lg:"repeat(4,1fr)"
//             },
//             gap: 3
//           }}
//         >
//           {products.map((product) => (
//             <Productcard
//               key={product._id}
//               product={product}
//               setPage={setPage}
//               setSelectedProduct={ setSelectedProduct}
//             />
//           ))}
//         </Box>

//       <Button
//         variant="outlined"
//         sx={{ mt: 4 }}
//         onClick={() => setPage("user")}
//       >
//         Back to Home
//       </Button>

//     </Box>
//   );
// }

// export default Products;


import { useEffect, useState,useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import Productcard from "../component/Productcard";

function Products({ setPage, setSelectedProduct, selectedProductType,cart,setCart }) {

  const [products, setProducts] = useState([]);
const [productTypes, setProductTypes] = useState([]);

const typeRefs = useRef({});

  const getProducts = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/user/products", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        setProducts(data.data);
      }

    } catch (error) {
      console.log("Error getting products:", error);
    }
  };

  const getProductTypes = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/product-types", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();

    console.log("Product Type Status:", response.status);
    console.log("Product Type Data:", data);

    if (response.ok) {
      setProductTypes(data.data);
    }

  } catch (error) {
    console.log("Error getting product types:", error);
  }
};

  useEffect(() => {
    getProducts();
    getProductTypes();
  }, []);

  useEffect(() => {
  if (
    selectedProductType &&
    productTypes.length > 0 &&
    products.length > 0
  ) {
    const section = typeRefs.current[selectedProductType];

    if (section) {
      setTimeout(() => {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 100);
    }
  }
}, [selectedProductType, productTypes, products]);


  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, sm: 4 },
        bgcolor: "#f5f5f5"
      }}
    >

      <Typography
        variant="h4"
        sx={{ mb: 1, fontWeight: "bold" }}
      >
        Products
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 3, color: "text.secondary" }}
      >
        Explore our collection of beauty and skincare products.
      </Typography>


      {productTypes.map((type) => {

  const typeProducts = products.filter(
    (product) => product.productTypeId === type._id
  );

  if (typeProducts.length === 0) {
    return null;
  }

  return (
    <Box key={type._id} 
    ref={(element)=>{typeRefs.current[type._id]=element}}
    sx={{ mb: 5 }}>

      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: "bold"
        }}
      >
        {type.name}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2,1fr)",
            md: "repeat(3,1fr)",
            lg: "repeat(4,1fr)"
          },
          gap: 3
        }}
      >

        {typeProducts.map((product) => (
          <Productcard 
            key={product._id} 
            product={product} 
            setPage={setPage} 
            setSelectedProduct={setSelectedProduct} 
            cart={cart} 
            setCart={setCart} 
          />
        ))}

      </Box>

    </Box>
  );
})}


      <Button
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={() => setPage("user")}
      >
        Back to Home
      </Button>

    </Box>
  );
}

export default Products;