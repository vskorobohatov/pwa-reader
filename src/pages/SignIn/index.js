import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import { User } from 'services/User';
import { HOME, SIGN_UP } from 'pathnameVariables';
import { saveToken } from 'helpers/tokenHelper';

import StyledTextField from 'components/StyledTextField';

import './styles.scss';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    login: "",
    password: "",
    request: ""
  });

  const handleSignIn = () => {
    const isEmailValid = !!email && email.trim();
    const isPasswordValid = !!password && password.trim();
    let validationErrors = {};
    if (!isEmailValid) {
      validationErrors = { ...validationErrors, email: "Please enter email!" }
    };
    if (!isPasswordValid) {
      validationErrors = { ...validationErrors, password: "Please enter password!" }
    };
    let validationKeys = Object.keys(validationErrors);
    if (validationKeys.length) {
      setErrors({ ...errors, ...validationErrors });
      document.getElementById(`${validationKeys[0]}-input`)?.focus();
    } else {
      User
        .login({ email, password })
        .then(res => {
          if (res?.jwt) {
            saveToken(res.jwt)
            navigate(HOME);
          }
        })
        .catch(e => {
          console.log(e)
          setErrors({ ...errors, request: e?.response?.data?.message || "Something went wrong! Try again later." })
        });
    }
  }

  const handleTestApi = async () => {
    try {
      const res = await axios.post("http://localhost:3001/sign-in", { email, password });
      console.log(res)
    } catch (e) {
      console.error("error", e)
    }
  }

  return (
    <div className='sign-in-page'>
      <div className="form">

        <div className="title">Sign In</div>

        <StyledTextField
          id="email-input"
          label="Email"
          placeholder="Enter email"
          value={email}
          onChange={e => {
            setEmail(e?.target?.value)
            setErrors({ ...errors, email: "", request: "" });
          }}
          onKeyDown={e => e?.code === "Enter" ? handleSignIn() : null}
          error={errors.email}
        />

        <StyledTextField
          id="password-input"
          type="password"
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={e => {
            setPassword(e?.target?.value)
            setErrors({ ...errors, password: "", request: "" });
          }}
          onKeyDown={e => e?.code === "Enter" ? handleSignIn() : null}
          error={errors.password}
        />

        <Button className="sign-button" onClick={handleSignIn}>Sign In</Button>

        <Button onClick={handleTestApi}>Test</Button>

        {errors.request ? (
          <div className="form-error-box">{errors.request}</div>
        ) : null}
        <div className='bottom-text'>
          Don't have an account?
          <span onClick={() => navigate(SIGN_UP)}>Sign Up</span>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
