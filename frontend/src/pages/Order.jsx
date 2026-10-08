import { Box, Button, Typography } from "@mui/material";

function Order({ setPage, cart, setCart }) {

  const totalPrice = cart.reduce(
    (total, product) =>
      total + Number(product.price) * product.quantity,
    0
  );

  const confirm = async () => {

    try {
      const token = localStorage.getItem("token");

      for (const product of cart) {

        const response = await fetch(
          "http://localhost:3000/orders/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              productId: product._id,
              quantity: product.quantity
            })
          }
        );

        const data = await response.json();
        console.log(data);
      }

      setCart([]);
      setPage("user");

    } catch (error) {
      console.log("error placing prder:", error);
    }
  };

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
          mb: 1,
          fontWeight: "bold"
        }}
      >
        My Order
      </Typography>


      {cart.map((product) => (

        <Box
          key={product._id}
          sx={{
            mt: 2,
            p: 3,
            bgcolor: "white",
            borderRadius: 3,
            boxShadow: 1
          }}
        >

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold"
            }}
          >
            {product.name}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Price: ₹{product.price}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Quantity: {product.quantity}
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "text.secondary"
            }}
          >
            Product Total: ₹{Number(product.price) * product.quantity}
          </Typography>

        </Box>

      ))}

      <Box
        sx={{
          mt: 3,
          p: 3,
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: 1
        }}
      >

        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold"
          }}
        >
          Total: ₹{totalPrice}
        </Typography>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            gap: 2,
            flexWrap: "wrap"
          }}
        >

          <Button
            variant="outlined"
            onClick={() => setPage("cart")}
          >
            Back to Cart
          </Button>

          <Button
            variant="contained"
            onClick={confirm}
          >
            Confirm Order
          </Button>

        </Box>

      </Box>

    </Box>
  );
}

export default Order;