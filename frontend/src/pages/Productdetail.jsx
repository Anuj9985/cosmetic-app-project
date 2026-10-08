// import { Box, Button, Typography } from "@mui/material";

// function Productdetail({ setPage, product,cart,setCart }) {

//   return (
//     <Box sx={{ padding: 3 }}>

//       <Typography variant="h4">
//         Product Detail
//       </Typography>

//       <Typography variant="h5" sx={{ mt: 3 }}>
//         {product.name}
//       </Typography>

//       <Typography sx={{ mt: 2 }}>
//         Price: ₹{product.price}
//       </Typography>

//       <Typography sx={{ mt: 2 }}>
//         {product.description}
//       </Typography>

//       <Button
//         variant="contained"
//         sx={{ mt: 3, mr: 2 }}
//         onClick={() => {
//   const existingProduct = cart.find(
//     (item) => item._id === product._id
//   );

//   if (existingProduct) {
//     const updatedCart = cart.map((item) =>
//       item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item );

//     setCart(updatedCart);
//   } else {
//     setCart([...cart, { ...product, quantity: 1 }]);
//   }

//   setPage("cart");
// }}
//           >
//         Add to Cart
//       </Button>

//       <Button
//         variant="outlined"
//         sx={{ mt: 3 }}
//         onClick={() => setPage("products")}
//       >
//         Back to Products
//       </Button>

//     </Box>
//   );
// }

// export default Productdetail;

import { Box, Button, Typography } from "@mui/material";

function Productdetail({ setPage, product, cart, setCart }) {

  const productImages = {
    "vitamin c serunm": "vitamin-c.png",
    "nicinamide face wash": "nicinamide.png",
    "salicilic face wash": "salicilic.png",
    "golden glow v32": "golden-glow.png",
    "shampoo": "shampoo.png",
    "conditioner":"conditioner.png",
    "smooth hair serum":"smoothhairserum.png",
    "hairoil":"hairoil.png",
    "hydraface":"hydraface.png",
    "purecalm mask":"purecalm.png",
    "sunscreen":"sunscreen.png",
    "hyaluronic serum":"hyaluronicserum.png",
    "detan serum":"detanserum.png",
    "tan repair night cream":"tannightcream.png",
    "detan face mask": "demask.png",
    "tanawat facewash":"detanfacewash.png"
  };

 const image = productImages[
  product.name.toLowerCase().replace(/\s+/g, " ").trim()
];


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
        sx={{
          mb: 3,
          fontWeight: "bold"
        }}
      >
        Product Detail
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          bgcolor: "white",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 2
        }}
      >

      
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 3
          }}
        >
          <img
            src={image || "/products/default.png"}
            alt={product.name}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "contain",
              display: "block"
            }}
          />
        </Box>

        
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            p: { xs: 3, md: 5 }
          }}
        >

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 2
            }}
          >
            {product.name}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 3
            }}
          >
            ₹{product.price}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.7,
              mb: 3
            }}
          >
            {product.description}
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 1,
              mr: 2,
              px: 3,
              py: 1.2,
              borderRadius: 2
            }}
            onClick={() => {

              const existingProduct = cart.find(
                (item) => item._id === product._id
              );

              if (existingProduct) {

                const updatedCart = cart.map((item) =>
                  item._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );

                setCart(updatedCart);

              } else {

                setCart([
                  ...cart,
                  { ...product, quantity: 1 }
                ]);

              }

              setPage("cart");
            }}
          >
            Add to Cart
          </Button>

          <Button
            variant="outlined"
            sx={{
              mt: 1,
              px: 3,
              py: 1.2,
              borderRadius: 2
            }}
            onClick={() => setPage("products")}
          >
            Back to Products
          </Button>

        </Box>

      </Box>

    </Box>
  );
}

export default Productdetail;