import React from "react";
import "./Loader.css";
// import auroraImage from "./path/to/your/aurora-image.png"; // Update this path

const Loader = () => {
  return (
    <div className="loader-screen">
      <div className="loader-circle"></div>
      {/* <img src={auroraImage} alt="Aurora Iron" className="loader-image" /> */}
      <h2 className="loader-title">Ayan Portfolio React App</h2>
      <p className="loader-subtitle">Installing packages...</p>
    </div>
  );
};

export default Loader;
