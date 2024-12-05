import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken } from "helpers/tokenHelper";
import { SIGN_IN } from "pathnameVariables";
import { Button } from "@mui/material";

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   if (!getToken()) {
  //     navigate(SIGN_IN);
  //   }
  // }, [getToken(), navigate]);

  console.log("window location", window.location);
  console.log("router location", location);

  return getToken() ? element : <><Button onClick={() => navigate(SIGN_IN)}>Sign in</Button ></>;
  // return element
};

export default PrivateRoute;