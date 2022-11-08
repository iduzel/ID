import { Box, Typography } from "@mui/material";
import axios from "axios";
import { React, useState } from "react";
import { Button2 } from "../../components/Atoms/Buttons/Button";
import { Input } from "../../components/Atoms/Inputs/Input";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

import e from "express";
import { register } from "../../firebase";

const Login = () => {

  const [emailfb, setEmailFb] = useState('');
  const [ passFb, setPassFb] = useState('');
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleNaviSignUp = () => {
    navigate("/register");
  };
  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("handle login", data);

    if (!data.email || !data.password) return alert("empty required field");

    const response = await axios.post("/users/login", data);

    if (response.data.success) {
      navigate("/home");
    }
  };

  // FORGOT PASSWORD
  const [checkEmail, setCheckEmail] = useState({ name: "" });
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    console.log("checkEmail", checkEmail);
    const response = await axios.post("/users/forgotPassword", checkEmail);
    if (response.data.success === true) {
      console.log("WE FOUND YOU");
    }
  };

  const handleFBSubmit = async () => {
    e.preventDefault();
   const user = await register(emailfb, passFb)
   console.log('userfb', user)
  }

  return (
    <Box className="login container ">

      <form className="m-5 border-5 border-success" onSubmit={handleFBSubmit}>
        <input type="email" placeholder="Enter an Email" value={emailfb} onChange={(e) => setEmailFb(e.target.value)} />
        <input type="password" placeholder="Enter an Password" value={passFb} onChange={(e) => setPassFb(e.target.value)} />
        <button disabled={!emailfb || !passFb} type="submit" >REGISTER</button>
      </form>



      <Typography>Signs from ID</Typography>
      <form className="container p-5 w-50" onSubmit={handleLogin}>
        
        <Input
          className="mb-4 mt-5"
          label="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}         
          borderRadius="5px"
         
       
          
        />
        <Input
          className="mb-1"
          label="Password"
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}         
          borderRadius="5px"
          
        />
        <Button2
          variant="fill"
          name="LOGIN"
          color="warning"
          type="submit"
        ></Button2>
      </form>
      <Box className="container">
         <span onClick={handleNaviSignUp}>Sign Up</span>

      {/* FORGOT PASSWORD - SEND YOUR EMAIL */}
      <Box className="mt-5 border p-1">
        <Typography>forgot password!</Typography>
        <Typography>Enter your email</Typography>
        <Input
          type="text"
          onChange={(e) =>
            setCheckEmail({ ...checkEmail, name: e.target.value })
          }
        />
        <Button2
          className="bg-info text-dark "
          name="SEND"
          onClick={(e) => handleForgotPassword(e)}
          variant="outlined"
          color="warning"
          size="large"
          borderRadius="30px"
          margin="10px"
          display={`${checkEmail.name}` ? "block" : "none"}
        ></Button2>
      </Box>
      </Box>
     
    </Box>
  );
};

export default Login;
