import React from "react";

const BuildLoader = ({ text = "Loading Materials..."}) => {
  return (
    <div className='text-center py-5'>
      <div className="build-loader-track mb-3">
        <span className="build-loader-bar"></span>
      </div>
      <div className="build-loader-text">
        <i className="bi bi-lightning-charge-fill me-1"></i>
        {text}
      </div>
    </div>
  );
};

export default BuildLoader;
