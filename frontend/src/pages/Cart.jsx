import { Box, Button, Typography } from "@mui/material";

function Cart({ setPage, cart, setCart }) {

  const totalPrice = cart.reduce(
    (total, product) =>
      total + Number(product.price) * product.quantity,
    0
  );

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
        My Cart
      </Typography>

      {cart.length === 0 ? (

        <Box
          sx={{
            bgcolor: "white",
            p: 4,
            borderRadius: 3,
            boxShadow: 1,
            textAlign: "center"
          }}
        >
          <Typography variant="h6">
            Cart is empty
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => setPage("products")}
          >
            Browse Products
          </Button>
        </Box>

      ) : (

        <>

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
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1
                }}
              >

                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {

                    if (product.quantity > 1) {

                      const updatedCart = cart.map((item) =>
                        item._id === product._id
                          ? {
                              ...item,
                              quantity: item.quantity - 1
                            }
                          : item
                      );

                      setCart(updatedCart);
                    }

                  }}
                >
                  -
                </Button>

                <Typography
                  sx={{
                    minWidth: 30,
                    textAlign: "center",
                    fontWeight: "bold"
                  }}
                >
                  {product.quantity}
                </Typography>

                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {

                    const updatedCart = cart.map((item) =>
                      item._id === product._id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                          }
                        : item
                    );

                    setCart(updatedCart);

                  }}
                >
                  +
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{ ml: 1 }}
                  onClick={() => {

                    const updatedCart = cart.filter(
                      (item) => item._id !== product._id
                    );

                    setCart(updatedCart);

                  }}
                >
                  Remove
                </Button>

              </Box>

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
                mt: 2,
                display: "flex",
                gap: 2,
                flexWrap: "wrap"
              }}
            >

              <Button
                variant="contained"
                onClick={() => setPage("order")}
              >
                Place Order
              </Button>

              <Button
                variant="outlined"
                onClick={() => setPage("products")}
              >
                Back to Products
              </Button>

            </Box>

          </Box>

        </>

      )}

    </Box>
  );
}

export default Cart;