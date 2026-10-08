
// import { Box, Button, Typography } from "@mui/material";
// import Navbar from "../component/Navbar";

// function Home({ setPage }) {

//   return (
//     <>
//       <Navbar setPage={setPage} />

//       <Box
//         sx={{
//           minHeight: "100vh",
    
//           bgcolor: "#f5f5f5"
//         }}
//       >

        
//         <Box
//           sx={{
//             width:"100%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             gap: 4,
//             flexDirection: { xs: "column", md: "row" },
//             bgcolor: "white",
//             borderRadius: 0,
//             p: { xs: 3, sm: 5 },
//             minHeight:{xs:"auto",md:"500px"},
//             boxSizing:"border-box"
//           }}
//         >

          
//           <Box sx={{ flex: 1,textAlign:{xs:"center",md:"left"} }}>

//             <Typography
//               variant="h3"
//               sx={{
//                 fontWeight: "bold",
//                 mb: 2,
//                 fontSize:{xs:"2.2rem",sm:"2.8rem",md:"3.2rem"}
//               }}
//             >
//               Welcome to Cosmetic Store
//             </Typography>

//             <Typography
//               variant="h6"
//               sx={{
//                 mb: 3,
//                 color: "text.secondary",
//                 lineHeight:1.6
//               }}
//             >
//               Discover beauty and skincare products
//               made for your everyday care.
//             </Typography>

//             <Button
//               variant="contained"
//               onClick={() => setPage("products")}
//               sx={{px:4,py:1.2,borderRadius:2}}
//             >
//               Shop Now
//             </Button>

//           </Box>

        
//           <Box
//             sx={{
//               flex: 1,
//               display: "flex",
//               justifyContent: "center",
//               alignItems:"center",
//               overflow:"hidden",
//               borderRadius:3
//             }}
//           >
//             <img
//               src="\cosmetic-home.png"
//               alt="Cosmetic products"
//               style={{
//                 width: "100%",
//                 height:"400px",
//                 borderRadius: "12px",
//                 objectFit: "cover",
//                 display:"block"
//               }}
//             />
//           </Box>

//         </Box>

//       </Box>
//     </>
//   );
// }

// export default Home;


import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Navbar from "../component/Navbar";

function Home({ setPage,setSelectedProductType }) {

  const [productTypes, setProductTypes] = useState([]);

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

      console.log(data);

      if (response.ok) {
        setProductTypes(data.data);
      }

    } catch (error) {
      console.log("Error getting product types:", error);
    }
  };

  useEffect(() => {
    getProductTypes();
  }, []);

  return (
    <>
      <Navbar setPage={setPage} />

      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f5f5f5"
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
            flexDirection: { xs: "column", md: "row" },
            bgcolor: "white",
            borderRadius: 0,
            p: { xs: 3, sm: 5 },
            minHeight: { xs: "auto", md: "500px" },
            boxSizing: "border-box"
          }}
        >

          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "left" }
            }}
          >

            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: {
                  xs: "2.2rem",
                  sm: "2.8rem",
                  md: "3.2rem"
                }
              }}
            >
              Welcome to Cosmetic Store
            </Typography>

            <Typography
              variant="h6"
              sx={{
                mb: 3,
                color: "text.secondary",
                lineHeight: 1.6
              }}
            >
              Discover beauty and skincare products
              made for your everyday care.
            </Typography>

            <Button
              variant="contained"
              onClick={() => setPage("products")}
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: 2
              }}
            >
              Shop Now
            </Button>

          </Box>


          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              borderRadius: 3
            }}
          >

            <img
              src="/cosmetic-home.png"
              alt="Cosmetic products"
              style={{
                width: "100%",
                height: "400px",
                borderRadius: "12px",
                objectFit: "cover",
                display: "block"
              }}
            />

          </Box>

        </Box>

        <Box
          sx={{
            p: { xs: 3, sm: 5 }
          }}
        >

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 1
            }}
          >
            Shop by Category
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mb: 4
            }}
          >
            Explore products by category
          </Typography>


          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)"
              },
              gap: 3
            }}
          >

            {productTypes.map((type) => (

              <Box
                key={type._id}
                sx={{
                  bgcolor: "white",
                  p: 3,
                  borderRadius: 3,
                  boxShadow: 2,
                  textAlign: "center"
                }}
              >

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 2
                  }}
                >
                  {type.name}
                </Typography>

                <Button
                variant="contained"
                onClick={() => {
                  setSelectedProductType(type._id);
                  setPage("products");
                }}
              >
                View Products
              </Button>

              </Box>

            ))}

          </Box>

        </Box>

      </Box>
    </>
  );
}

export default Home;