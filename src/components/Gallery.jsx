import React from "react";
import "./Gallery.css";
import "../styles/microinteractions.css";

const Gallery = () => {
  return (
    <section className="gallery-section">
      <h2 className="text-glow">Gallery</h2>
      <div className="gallery-images">
        <div className="image-zoom card-tilt">
          <img src={`${process.env.PUBLIC_URL}/product-images/Gallery 1.png`} alt="Gallery 1" />
        </div>
        <div className="image-zoom card-tilt">
          <img src={`${process.env.PUBLIC_URL}/product-images/Gallery 2.png`} alt="Gallery 2" />
        </div>
        <div className="image-zoom card-tilt">
          <img src={`${process.env.PUBLIC_URL}/product-images/Gallery 3.png`} alt="Gallery 3" />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
