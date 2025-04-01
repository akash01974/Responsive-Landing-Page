import React from 'react';

const NavBar = () => {
  return (
    <nav className="main-nav">
      <div className="nav-brand">
        Cosmic<span>AI</span>
      </div>
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="auth-section">
        <a href="#signup" className="signup-btn">Sign Up</a>
      </div>
    </nav>
  );
};

export default NavBar;