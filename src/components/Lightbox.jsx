import React, { useState } from 'react';
import './Lightbox.css';

const Lightbox = ({ isOpen, images, currentIndex, onClose, onNext, onPrev }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="lightbox-overlay" onClick={handleOverlayClick}>
      <div className="lightbox-container">
        <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox">
          ✕
        </button>
        
        <button 
          className="lightbox-nav lightbox-prev" 
          onClick={onPrev}
          aria-label="Previous image"
          disabled={currentIndex === 0}
        >
          ‹
        </button>
        
        <div className="lightbox-content">
          <img 
            src={images[currentIndex]?.src} 
            alt={images[currentIndex]?.alt}
            className="lightbox-image"
          />
          <div className="lightbox-info">
            <h3>{images[currentIndex]?.title}</h3>
            <p>{images[currentIndex]?.description}</p>
            <div className="lightbox-counter">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
        
        <button 
          className="lightbox-nav lightbox-next" 
          onClick={onNext}
          aria-label="Next image"
          disabled={currentIndex === images.length - 1}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Lightbox;
