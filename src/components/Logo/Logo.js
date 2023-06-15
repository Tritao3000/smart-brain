import React from "react";
// import Tilt from 'react-tilt';
import Tilt from "react-parallax-tilt";
import logo from "./JS.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0 ">
      <Tilt
        className="Tilt br2 shadow-2 "
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa3">
          <img style={{ paddingTop: "8px" }} alt="logo" src={logo} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
