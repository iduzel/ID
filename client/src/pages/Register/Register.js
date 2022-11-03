import React, { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router";
import axios from "axios";
import { Input } from "../../components/Atoms/Inputs/Input.jsx";
import { Button2 } from "../../components/Atoms/Buttons/Button";
import CheckboxAtom from "../../components/Atoms/Checkboxes/Checkbox";
import { FormControlLabel, FormGroup, Typography } from "@mui/material";
import Password from "../../components/molecules/Password.jsx";

export default function Register() {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleNaviSignIn = () => {
    navigate("/");
  };

  // SUBMIT REGISTER FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) return console.log("EMPTY REGISTER");
    if (data.password.length < 8)
      return alert("The password must be at least 8 characters");
    if (data.password === data.password.toLowerCase())
      return alert("The password must have at least 1 uppercase");
    if (data.password === data.password.toUpperCase())
      return alert("The password must have at least 1 lowercase");
    if (!/\d/.test(data.password))
      return alert("The password must have at least 1 number");
    if (!specialChars.test(data.password))
      return alert("The password must have at least 1 special character");

    await axios.post("/users/register", data);

    setData({ email: "", password: "" });

    navigate("/");
  };

  // VERIFY EMAIL BY CODE
  const [verifyNumber, setVerifyNumber] = useState({ number: undefined });
  const handleSend = async (e) => {
    e.preventDefault();
    await axios.post("/users/verify", verifyNumber);
  };

  return (
    <div className="register">
      <div className="register-main">
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <div className="logo">
            <img
              className="logo-image"
              src="https://media.istockphoto.com/photos/leaf-symbol-green-black-picture-id693694672?b=1&k=20&m=693694672&s=170667a&w=0&h=_B5pyXi5TjexGcH6FbN2IiJy2Qa6fKqs-2KG0gb5Zy8="
              alt="logo"
            />
          </div>
          <h3 className="title">SIGN UP</h3>
          <Input //EMAIL
            required
            className=""
            type="email"
            label="Email"
            variant="outlined"
            value={data.email}
            setValue={setData}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            width="75%"
            borderRadius="10px"
            margin="0px 0px 10px 0px"
          />

          <Password
            required
            value={data.password}
            password={data.password}
            min="8"
            max="20"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            width="100%"
            label='Password'
          />

          <FormGroup
            style={
              data.password.length > 0
                ? { display: "flex" }
                : { display: "none" }
            }
            className=" w-75   rounded mt-1 ms-5 ps-2"
          >
            <Typography className="text-start fs-6">
              Password must have
            </Typography>
            <FormControlLabel
              className="m-0 "
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "10px",
                  padding: "1px",
                },
              }}
              control={
                <CheckboxAtom checkboxSize="10px" padding="1px" margin="0px" />
              }
              label="at least 8 characters"
              checked={data.password.length >= 8 ? true : false}
            />
            <FormControlLabel
              className=" m-0 "
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "10px",
                  padding: "1px",
                },
              }}
              control={
                <CheckboxAtom checkboxSize="10px" padding="1px" margin="0px" />
              }
              label="at least 1 uppercase"
              checked={
                data.password !== data.password.toLowerCase() ? true : false
              }
            />

            <FormControlLabel
              className=" m-0 "
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "10px",
                  padding: "1px",
                },
              }}
              control={
                <CheckboxAtom checkboxSize="10px" padding="1px" margin="0px" />
              }
              label="at least 1 lowercase"
              checked={
                data.password !== data.password.toUpperCase() ? true : false
              }
            />
            <FormControlLabel
              className=" m-0 "
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "10px",
                  padding: "1px",
                },
              }}
              control={
                <CheckboxAtom checkboxSize="10px" padding="1px" margin="0px" />
              }
              label="at least 1 number"
              checked={/\d/.test(data.password) ? true : false}
            />

            <FormControlLabel
              className=" m-0 "
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "10px",
                  padding: "1px",
                },
              }}
              control={
                <CheckboxAtom checkboxSize="10px" padding="1px" margin="0px" />
              }
              label="at least 1 special character"
              checked={specialChars.test(data.password) ? true : false}
            />
          </FormGroup>

          <Button2
            variant="contained"
            type="submit"
            className="signup-button"
            color="primary"
            name="SIGN UP"
          ></Button2>

          <div className="have-account">
            <small>
              Already have an account !{" "}
              <span onClick={handleNaviSignIn}>Sign In</span>
            </small>
          </div>
        </form>
      </div>
      <div>
        <h6>Please enter the code what We have sent to your email account</h6>
        <div>
          <input
            className=" verifyInput "
            type="text"
            minLength={6}
            maxLength={6}
            value={verifyNumber.number}
            onChange={(e) =>
              setVerifyNumber({ ...verifyNumber, number: e.target.value })
            }
          />
          <button onClick={handleSend}>SEND</button>
        </div>
      </div>
    </div>
  );
}
