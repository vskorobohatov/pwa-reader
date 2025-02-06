import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getSavedValue } from "helpers/ui";
import { setSettings } from "store/reducers/settings";
import { SETTINGS_STORAGE_KEY } from "storageVariables";

import Header from "components/Header";

import "./styles.scss";

const Home = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    initSettings();
  }, []);

  const initSettings = () => {
    const savedSettings = getSavedValue(SETTINGS_STORAGE_KEY);
    dispatch(setSettings(savedSettings));
  };

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
      <Outlet />
    </div>
  )
};

export default Home;
