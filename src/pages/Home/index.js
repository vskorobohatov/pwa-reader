import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "components/Header";
import "./styles.scss";

const Home = () => {
  return (
    <div className="owner-app-wrapper">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
      />
      <Header />
      <div className="owner-app-content">
        <Outlet />
      </div>
    </div>
  )
};

export default Home;
