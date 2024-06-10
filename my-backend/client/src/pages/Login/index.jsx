import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  Grid,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import React, { useEffect, useState } from "react";
import fetchData from "../../Utils/fetchData";
import 'react-toastify/dist/ReactToastify.css';
import Toast from "../../components/Toast"
import { login } from "../../Sore/Slices/Auth";
import { useDispatch,useSelector } from "react-redux";

export default function Login() {
  const {user,token,toast} = useSelector((state) => state.auth)
  console.log(user);
  const dispatch = useDispatch()
  
  const handelCheng = (e)=>{
    const {name, value} = e.target
    dispatch(login({user:{...user,[name]:value},toast:{ type: "info", message: " "}}))
  }

  const HandleLogin = async () => {
    console.log(toast)
    try {
      if (user.password) {
        const res = await fetchData("/user" , {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          }
        } )
        console.log(res[0].jwt);
        if (res[0].jwt) {
          dispatch(login({toast:{ type: "success", message: "Login Success"}}))
          setTimeout(() => {
            dispatch(login({ token: res[0].jwt }));
          }, 2000);
        }else{
          dispatch(login({toast:{ type: "error", message: "username and password not found"}}))
        }
      }else {
        dispatch(login({toast:{ type: "error", message: "password is required"}}))
      }
    } catch (error) {
      
    }
  };
  

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box color={"white"}>
      <Toast type={toast.type} message={toast.message}/>
      <Grid container spacing={0}>
        <Grid xs={12} py={"3%"}>
          <Box
            component={"form"}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Typography variant="h5" textAlign={"center"}>
              LOGIN
            </Typography>
            <TextField
              required
              label="UserName"
              id="outlined-required"
              type="email"
              name="name"
              onChange={handelCheng}
              sx={{ m: 1, width: "40%" ,color:"success"}}
            />
            <FormControl sx={{ m: 1, width: "40%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
              
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                
                onChange={handelCheng}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Button
              onClick={HandleLogin}
              sx={{
                backgroundColor: "#FFAFCE",
                color: "black",
                p: 1.5,
                width: "30ch",
                "&:hover": { backgroundColor: "#FFAFCE" },
              }}
            >
              Login
            </Button>
            
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
