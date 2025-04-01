import React from "react";

const WelcomeSection = () => {
  const handleTryNowClick = () => {
    alert("Try Now button clicked!");
  };

  return (
    <div className="welcome-section">
      <h1>
        Welcome to Cosmic<span>AI</span>
      </h1>
      <p>
        Explore the future of artificial intelligence with our cutting-edge
        platform
      </p>
      <button className="try-now-btn" onClick={handleTryNowClick}>
        Try Now
      </button>
    </div>
  );
};

export default WelcomeSection;
