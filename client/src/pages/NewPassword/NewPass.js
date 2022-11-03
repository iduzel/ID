import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button2 } from "../../components/Atoms/Buttons/Button";
import Password from "../../components/molecules/Password";

const NewPass = () => {
  const location = useLocation();
  const [newPasswordData, setNewPasswordData] = useState({
    email: location.state.mail,
    password: "",
  });


  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  // NEW PASSWORD

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNewPassword = async (e) => {
    e.preventDefault();
    if (!newPassword) return console.log("EMPTY PASSWORD");
    if (newPassword !== confirmPassword) return alert("Password doesn't match");
    if (newPassword.length < 8)
      return alert("The password must be at least 8 characters");
    if (newPassword === newPassword.toLowerCase())
      return alert("The password must have at least 1 uppercase");
    if (newPassword === newPassword.toUpperCase())
      return alert("The password must have at least 1 lowercase");
    if (!/\d/.test(newPassword))
      return alert("The password must have at least 1 number");
    if (!specialChars.test(newPassword))
      return alert("The password must have at least 1 special character");

     setNewPasswordData({ ...newPasswordData, password: newPassword });

    console.log('newPassword',newPassword)     

  };
  console.log("userEmailaaaaaaaaaaaaaaaaaaaaaaaaa", newPasswordData);
  return (
    <Box className="mt-5 border border-5 border-danger">
      <h1>Set New Password</h1>
      <Password
        className="mb-2"
        value={newPassword}
        password={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        label="New Password"
      />
      <Password
        value={confirmPassword}
        password={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        label="Confirm New Password"
      />
      <Button2
        onClick={handleNewPassword}
        name="Send"
        variant="outlined"
        onChange={handleNewPassword}
      ></Button2>
    </Box>
  );
};

export default NewPass;
