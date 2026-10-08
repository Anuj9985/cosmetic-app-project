

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography
} from "@mui/material";

function Productcard({ product, setPage, setSelectedProduct,cart,setCart }) {


  const addToCart = () => {
  const existingProduct = cart.find(
    (item) => item._id === product._id
  );

  if (existingProduct) {
    setCart(
      cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  } else {
    setCart([
      ...cart,
      {
        ...product,
        quantity: 1
      }
    ]);
  }
  setPage("cart");
};

  const productImages = {
    "vitamin c serunm": "/vitamin-c.png",
    "nicinamide face wash": "nicinamide.png",
    "salicilic face wash": "salicilic.png",
    "golden glow v32": "golden-glow.png",
    "shampoo": "shampoo.png",
    "conditioner":"/conditioner.png",
    "smooth hair serum":"smoothhairserum.png",
    "hair oil":"hairoil.png",
    "hydra face serum":"hydraface.png",
    "purecalm mask":"purecalm.png",
    "sunscreen":"sunscreen.png",
    "hyaluronic serum":"hyaluronicserum.png",
    "detan serum":"detanserum.png",
    "tan repair night cream":"tannightcream.png",
    "detan face mask": "/demask.png",
    "tanawat facewash": "/detanfacewash.png"
  };


 const image = productImages[
  product.name.toLowerCase().replace(/\s+/g, " ").trim()
];
  

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 2
      }}
    >

      <img
        src={image || "/products/default.png"}
        alt={product.name}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "contain",
          display: "block"
        }}
      />

      <CardContent>

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold"
          }}
        >
          {product.name}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            fontWeight: "bold"
          }}
        >
          ₹{product.price}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "text.secondary"
          }}
        >
          {product.description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 2
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setSelectedProduct(product);
              setPage("productdetail");
            }}
          >
            View Details
          </Button>
        
          <Button
            variant="outlined"
            onClick={addToCart}
          >
            Add to Cart
          </Button>
        </Box>

      </CardContent>

    </Card>
  );
}

export default Productcard;