import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper
} from "@mui/material";

function Signup({setPage}) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup =async (e) => {
    e.preventDefault();

    try{
      const response=await fetch("http://localhost:3000/signup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
       body: JSON.stringify({
        name,
        email,
        password
       })

      });
      const data=await response.json();
      console.log(data);
     if(response.ok){
      alert("signup Successful");
      setPage("login");
     }
     else{
      alert(data.message);
     }
    }
    catch(error){
      console.log("signup error:",error);
    }


    
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor:"white",
        p:2
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth:400,
          p:{xs:3,sm:4},
          borderRadius:3
        }}
      >

<Box sx={{textAlign:"center",mb:3}}>

   <img
            src="/logo.png"
            alt="Cosmatic Store Logo"
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />

        <Typography variant="h4" align="center" gutterBottom>
          Signup
        </Typography>
        </Box>

        <Box component="form" onSubmit={signup}>

          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 3,py:1.2,borderRadius:2 }}
          >
            Signup
          </Button>

          <Button
  fullWidth
  variant="text"
  onClick={() => setPage("login")}
  sx={{ mt: 1 }}
>
  Already have an account? Login
</Button>

        </Box>
      </Paper>
    </Box>
  );
}

export default Signup;