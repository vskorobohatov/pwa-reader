import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken } from "helpers/tokenHelper";
import { SIGN_IN } from "pathnameVariables";

const PrivateRoute = ({ element }) => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!getToken()) {
  //     navigate(SIGN_IN);
  //   }
  // }, [getToken(), navigate]);

  // return getToken() ? element : <></>;
  return element
};

export default PrivateRoute;