import React from "react";

import "./styles.scss";

const About = () => {
  return (
    <div className="about-wrapper">
      <div className="title">About</div>
      <div className="section">
        This app was created as a universal book reader that can work on any device (thanks to the PWA technology) and sync reading progress between devices.
      </div>
      <div className="section">
        Created by SnailDog and Scalan.
      </div>
    </div>
  )
};

export default About;
