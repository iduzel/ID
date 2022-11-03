import { Box, Typography } from "@mui/material";
import axios from "axios";

import { React, useState } from "react";
import { Button2 } from "../../components/Atoms/Buttons/Button";
import { Input } from "../../components/Atoms/Inputs/Input";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {

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
    if(response.data.success === true) {
      console.log('WE FOUND YOU')
      navigate('/setNewPassword', { state: {id:1, mail: checkEmail.name}})
    }
  };



  return (
    <Box className="w-50 m-5">
      <form onSubmit={handleLogin}>
        <Input
          className="mb-1"
          label="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <Input
          className="mb-1"
          label="Password"
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <Button2
          variant="outlined"
          name="LOGIN"
          color="success"
          type="submit"
        ></Button2>
      </form>
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
        <Button2 name="SEND" onClick={(e) => handleForgotPassword(e)}></Button2>
      </Box>

       
    </Box>
  );
};

export default Login;
