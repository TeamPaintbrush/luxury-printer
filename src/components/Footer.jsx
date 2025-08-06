import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer-section">
    <p>Contact: info@luxuryprinter.com | (555) 123-4567</p>
    <div className="socials">
      <a href="#">Instagram</a> | <a href="#">LinkedIn</a> | <a href="#">Facebook</a>
    </div>
    <p>&copy; {new Date().getFullYear()} Luxury Printer & Packaging</p>
  </footer>
);

export default Footer;
