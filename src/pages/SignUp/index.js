import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { User } from 'services/User';
import { HOME } from 'pathnameVariables';
import { saveToken } from 'helpers/tokenHelper';

import StyledTextField from 'components/StyledTextField';

import './styles.scss';

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({
    login: "",
    password: "",
    request: ""
  });

  const handleSignUp = () => {
    const isEmailValid = !!email && email.trim();
    const isPasswordValid = !!password && password.trim();
    const isNameValid = !!password && password.trim();
    let validationErrors = {};
    if (!isEmailValid) {
      validationErrors = { ...validationErrors, login: "Please enter email!" }
    };
    if (!isNameValid) {
      validationErrors = { ...validationErrors, login: "Please enter name!" }
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
        .signup({ email, password })
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

  return (
    <div className='sign-in-page'>
      <div className="form">

        <div className="title">Sign Up</div>

        <StyledTextField
          id="name-input"
          label="Name"
          placeholder="Enter name"
          value={name}
          onChange={e => {
            setName(e?.target?.value)
            setErrors({ ...errors, login: "", request: "" });
          }}
          onKeyDown={e => e?.code === "Enter" ? handleSignUp() : null}
          error={errors.name}
        />

        <StyledTextField
          id="email-input"
          label="Email"
          placeholder="Enter email"
          value={email}
          onChange={e => {
            setEmail(e?.target?.value)
            setErrors({ ...errors, email: "", request: "" });
          }}
          onKeyDown={e => e?.code === "Enter" ? handleSignUp() : null}
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
          onKeyDown={e => e?.code === "Enter" ? handleSignUp() : null}
          error={errors.password}
        />

        <Button className="sign-button" onClick={handleSignUp}>Sign In</Button>

        {errors.request ? (
          <div className="form-error-box">{errors.request}</div>
        ) : null}

      </div>
    </div>
  );
}

export default SignUp;
