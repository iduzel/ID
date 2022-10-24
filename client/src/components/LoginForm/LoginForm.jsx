import * as React from "react";
import "./LoginForm.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

export default function ValidationTextFields() {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const [emailValue, setEmailValue] = useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box className="loginform">
     
      <Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "50ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            value={emailValue}
            id="standard-basic"
            label="Email"
            variant="standard"
            color="warning"
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </Box>

        <FormControl sx={{ m: 1, width: "50ch" }} variant="standard">
          <InputLabel color="warning" htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            color="warning"
            id="standard-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  color="warning"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button color="warning" variant="contained">
          SIGN IN
        </Button>
      </Box>
      <Box
        sx={{
          color: "black",
        }}
        
      >
        <div className="">Don't have an account!</div>
        <Link to='/register'>Sign Up</Link>
      </Box>
    </Box>
  );
}
