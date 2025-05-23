import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { User } from 'services/User';
import { HOME, SIGN_IN } from 'pathnameVariables';
import { saveToken } from 'helpers/tokenHelper';

import StyledTextField from 'components/StyledTextField';

import './styles.scss';

const DEFAULT_ERROR_TEXT = "Something went wrong! Try again later.";

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

  const handleSignUp = async () => {
    try {
      const isEmailValid = !!email && email.trim();
      const isPasswordValid = !!password && password.trim();
      const isNameValid = !!name && name.trim();
      let validationErrors = {};
      if (!isEmailValid) {
        validationErrors = { ...validationErrors, email: "Please enter email!" }
      };
      if (!isNameValid) {
        validationErrors = { ...validationErrors, name: "Please enter name!" }
      };
      if (!isPasswordValid) {
        validationErrors = { ...validationErrors, password: "Please enter password!" }
      };
      let validationKeys = Object.keys(validationErrors);
      if (validationKeys.length) {
        setErrors({ ...errors, ...validationErrors });
        document.getElementById(`${validationKeys[0]}-input`)?.focus();
      } else {
        const result = await User.signup({ email, password, name });
        if (result.status === "SUCCESS") {
          const { jwt, message } = await User.login({ email, password });
          if (!!jwt) {
            saveToken(jwt)
            navigate(HOME);
          } else {
            setErrors({ ...errors, request: message || DEFAULT_ERROR_TEXT });
          }
        } else {
          setErrors({ ...errors, request: result?.message || DEFAULT_ERROR_TEXT });
        }
      }
    } catch (e) {
      setErrors({ ...errors, request: e?.response?.data?.message || DEFAULT_ERROR_TEXT });
    }
  }

  const handleEnterKey = (e) => {
    if (e?.code === "Enter") {
      handleSignUp();
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
            setErrors({ ...errors, name: "", request: "" });
          }}
          onKeyDown={handleEnterKey}
          error={errors.name}
          errorText={errors.name}
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
          onKeyDown={handleEnterKey}
          error={errors.email}
          errorText={errors.email}
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
          onKeyDown={handleEnterKey}
          error={errors.password}
          errorText={errors.password}
        />

        <Button id="sign-up-button" className="sign-button" onClick={handleSignUp}>Sign Up</Button>

        {errors.request ? (
          <div className="form-error-box">{errors.request}</div>
        ) : null}

        <div className='bottom-text'>
          Already have an account?
          <span onClick={() => navigate(SIGN_IN)}>Sign Up</span>
        </div>

      </div>
    </div>
  );
}

export default SignUp;
