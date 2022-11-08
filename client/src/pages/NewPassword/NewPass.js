import { Box } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button2 } from "../../components/Atoms/Buttons/Button";
import Password from "../../components/molecules/Password";

const NewPass = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [newPasswordData, setNewPasswordData] = useState({
    email: "" ,
    password: "",
  });


  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  // NEW PASSWORD

 
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNewPassword = async (e) => {
    e.preventDefault();
    if (!newPasswordData.password) return console.log("EMPTY PASSWORD");
    if (newPasswordData.password !== confirmPassword) return alert("Password doesn't match");
    if (newPasswordData.password.length < 8)
      return alert("The password must be at least 8 characters");
    if (newPasswordData.password === newPasswordData.password.toLowerCase())
      return alert("The password must have at least 1 uppercase");
    if (newPasswordData.password === newPasswordData.password.toUpperCase())
      return alert("The password must have at least 1 lowercase");
    if (!/\d/.test(newPasswordData.password))
      return alert("The password must have at least 1 number");
    if (!specialChars.test(newPasswordData.password))
      return alert("The password must have at least 1 special character");

      console.log('password is done')
    const response = await axios.post('/users/newPassword', newPasswordData) 
    console.log('response new pass', response.data)

    navigate('/')

      

  };

  return (
    <Box className="mt-5 border border-5 border-danger container w-50 d-flex flex-column ">
      <h1>Set New Password</h1>
      <Password
        className="mb-2"
        value={newPasswordData.password}
        password={newPasswordData.password}
        onChange={(e) => setNewPasswordData({ ...newPasswordData, password: e.target.value })}
        label="New Password"
      />
      <Password
        value={confirmPassword}
        password={confirmPassword}
        onChange={(e) =>  setConfirmPassword(e.target.value)}
        label="Confirm New Password"
      />
      <Button2
        onClick={handleNewPassword}
        name="Send"
        variant="outlined"   
        width="1000px"  
        size="small"  
      ></Button2>
    </Box>
  );
};

export default NewPass;
