// import {Box, Button, Typography } from "@mui/material";

// function AdminDashboard({setPage}){
//     return(
//         <Box sx={{minHeight:"100vh" , p:5, bgcolor:"#f5f5f5"}}>
//             <Typography variant="h4" sx={{mb:1, fontWeight:"bold"}}>
//                 Admin Dashboard
//             </Typography>

//         <Button 
//         variant="contained"
//         sx={{mr:2}}
//         onClick={()=>setPage("manageProductType")}
//         >Manage Product Types</Button>

//         <Button
//         variant="contained"
//         sx={{mr:2}}
//         onClick={()=>setPage("manageProduct")}
//         >Manage Products</Button>

//        <Button
//           variant="contained"
//           onClick={() => setPage("manageOrders")}
//         >
//           Manage Orders
//         </Button>
//         </Box>
//     );
// }

// export default AdminDashboard;



import { Box, Button, Typography } from "@mui/material";

function AdminDashboard({ setPage }) {

  const logout = () => {
  localStorage.removeItem("token");
  setPage("login");
};
  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 5,
        bgcolor: "#f5f5f5"
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 1,
          fontWeight: "bold",
          textAlign:"center"
        }}
      >
        Admin Dashboard
      </Typography>


      <Box
        sx={{
          display: "flex",
          justifyContent:"center",
          gap: 3,
          flexWrap: "wrap"
        }}
      >
        <Box
          sx={{
           width: { xs: "100%", sm: "280px" },
            p: 3,
            bgcolor: "white",
            borderRadius: 3,
            boxShadow: 2
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
            Product Types
          </Typography>

         

          <Button
            variant="contained"
            onClick={() => setPage("manageProductType")}
          >
            Manage Product Types
          </Button>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", sm: "280px" },
            p: 3,
            bgcolor: "white",
            borderRadius: 3,
            boxShadow: 2
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
            Products
          </Typography>

          

          <Button
            variant="contained"
            onClick={() => setPage("manageProduct")}
          >
            Manage Products
          </Button>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", sm: "280px" },
            p: 3,
            bgcolor: "white",
            borderRadius: 3,
            boxShadow: 2
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
            Orders
          </Typography>


          <Button
            variant="contained"
            onClick={() => setPage("manageOrders")}
          >
            Manage Orders
          </Button>
        </Box>
      </Box>
<Box sx={{display:"flex",justifyContent:"center"}}>
      <Button
      variant="outlined"
      onClick={() => {
      logout();
    
    }}
    sx={{mt:4,color:"error"}}
      >Logout</Button>
    </Box>
    </Box>
    
    

  );
}

export default AdminDashboard;

