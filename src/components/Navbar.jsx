import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import "../styles/microinteractions.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // We're already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="navbar gradient-border">
      <div 
        className="navbar-logo text-glow" 
        onClick={handleLogoClick}
        style={{ cursor: 'pointer' }}
      >
        LUXURY PRINTER
      </div>
      <ul className="navbar-links">
        <li className="text-glow gold-ripple" onClick={() => handleNavigation('home')}>Home</li>
        <li className="text-glow gold-ripple" onClick={() => handleNavigation('products')}>Products</li>
        <li className="text-glow gold-ripple" onClick={() => handleNavigation('about')}>About</li>
        <li className="text-glow gold-ripple" onClick={() => handleNavigation('gallery')}>Gallery</li>
        <li className="text-glow gold-ripple" onClick={() => handleNavigation('contact')}>Contact</li>
      </ul>
      <div className="navbar-cta">
        <button onClick={() => handleNavigation('products')}>Shop Now</button>
      </div>
    </nav>
  );
};

export default Navbar;
