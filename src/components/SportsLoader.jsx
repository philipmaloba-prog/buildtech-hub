import React from "react";

const SportsLoader = ({ text = "Loading...", compact = false }) => {
  return (
    <div className={`sports-loader ${compact ? "compact" : ""}`}>
      <div className="sports-loader-track">
        <span className="sports-loader-ball"></span>
      </div>
      <div className="sports-loader-text">
        <i className="bi bi-lightning-charge-fill me-1"></i>
        {text}
      </div>
    </div>
  );
};

export default SportsLoader;
