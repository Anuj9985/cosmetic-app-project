import { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

function Login({setPage}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const Role=(token)=>{
  const payload=token.split(".")[1];
  const decode=JSON.parse(atob(payload));
  return decode.role;
};


  const login =async (e) => {
    e.preventDefault();

    try{
      const response=await fetch("http://localhost:3000/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          password
        })
      });

      const data=await response.json();

      if(response.ok){
        localStorage.setItem("token",data.token);
        const role=Role(data.token);
        console.log("login successful");
      console.log("Role:",role);
      
alert("Login successful");

       if(role==="admin"){
        setPage("admin");
       }
       else{
        setPage("user");
       }
      }
      else{
        console.log(data.message);
        alert(data.message);
      }

      
    }
    catch(error){
      console.log("login error:",error);
      
      
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

         <Box
          sx={{
            textAlign: "center",
            mb: 3
          }}
         >
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
          Login
        </Typography>
        </Box>

        <Box component="form" onSubmit={login}>

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
            sx={{ mt: 3,py:1.2,borderRadius:2}}
          >
            Login
          </Button>

          <Button
             fullWidth
             variant="text"
             onClick={() => setPage("signup")}
             sx={{ mt: 1 }}
           >
             Create an account
           </Button>

        </Box>
      </Paper>
    </Box>
  );
}

export default Login;