import React from "react";
import "./Hero.css";
import "../styles/microinteractions.css";

const Hero = () => {
  const banner = process.env.PUBLIC_URL + '/upload/Luxury Header.png';

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" style={{
      backgroundImage: banner
        ? `linear-gradient(rgba(34,34,34,0.7), rgba(212,175,55,0.3)), url('${banner}')`
        : 'linear-gradient(120deg, #222 60%, #D4AF37 100%)',
      backgroundSize: banner ? 'cover' : 'auto',
      backgroundPosition: 'center',
      minHeight: '75vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      borderRadius: '0 0 40px 40px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.18)'
    }}>
      <div className="hero-content luxury">
        <h1 className="text-glow floating">Luxury Printing & Packaging</h1>
        <p>Experience the art of print with bespoke, high-end materials and finishes.</p>
        <button 
          className="cta-btn luxury-button gold-ripple"
          onClick={scrollToProducts}
        >
          Browse Products
        </button>
      </div>
    </section>
  );
};

export default Hero;
