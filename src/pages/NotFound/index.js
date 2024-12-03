import React from "react";
import "./styles.scss";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  console.log("location", location);
  
  return (
    <div className="not-found-wrapper">
      404 - Page not found
    </div>
  )
};

export default NotFound;
