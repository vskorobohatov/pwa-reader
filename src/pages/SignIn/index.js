import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { User } from 'services/User';
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
        .login({ login: email, password })
        .then(res => {
          if (res?.token) {
            saveToken(res.token)
            navigate("/");
          }
        })
        .catch(e => {
          console.log(e)
          setErrors({ ...errors, request: e?.response?.data?.message || "Something went wrong! Try again later." })
        });
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

        {errors.request ? (
          <div className="form-error-box">{errors.request}</div>
        ) : null}

      </div>
    </div>
  );
}

export default SignIn;
