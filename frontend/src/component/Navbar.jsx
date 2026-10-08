import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

function Navbar({ setPage }) {

  const [anchor, setAnchor] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    setPage("login");
  };

  return (
    <AppBar position="static">


      <Toolbar  sx={{gap:1,px:{xs:2,sm:3}}}>

        <img
          src="/logo.png"
          alt="Cosmatic Store Logo"
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "10px"
          }}
        />

        <Typography
          variant="h6"
          sx={{ flexGrow: 1 ,fontWeight:"bold"}}
        >
          Cosmatic Store
        </Typography>

        <IconButton
         color="inherit"
         sx={{ display: { xs: "block", sm: "none" } }}
         onClick={(e) => setAnchor(e.currentTarget)}
       >
         <MenuIcon />
       </IconButton>

        <Button
          color="inherit"
          sx={{ display: { xs: "none", sm: "block" } }}
          onClick={() => setPage("products")}
        >
          Products
        </Button>

        <Button
          color="inherit"
          sx={{ display: { xs: "none", sm: "block" } }}
          onClick={() => setPage("cart")}
        >
          🛒
        </Button>

        <Button
          color="inherit"
          sx={{ display: { xs: "none", sm: "block" } }}
          onClick={() => setPage("myorders")}
        >
          My Orders
        </Button>

        <Button
          color="inherit"
          sx={{ display: { xs: "none", sm: "block" } }}
          onClick={logout}
        >
          Logout
        </Button>

      </Toolbar>
<Menu
  anchorEl={anchor}
  open={Boolean(anchor)}
  onClose={() => setAnchor(null)}
>
  <MenuItem
    onClick={() => {
      setPage("products");
      setAnchor(null);
    }}
  >
    Products
  </MenuItem>

  <MenuItem
    onClick={() => {
      setPage("cart");
      setAnchor(null);
    }}
  >
    🛒 Cart
  </MenuItem>

  <MenuItem
    onClick={() => {
      setPage("myorders");
      setAnchor(null);
    }}
  >
    My Orders
  </MenuItem>

  <MenuItem
    onClick={() => {
      logout();
      setAnchor(null);
    }}
  >
    Logout
  </MenuItem>
</Menu>

    </AppBar>
  );
}

export default Navbar;