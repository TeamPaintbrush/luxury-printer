import React from "react";
import "./PackagingOptions.css";

const PackagingOptions = () => (
  <section className="packaging-section">
    <h2>Packaging Options</h2>
    <div className="packaging-grid">
      <div className="package-card">
        <img src="https://via.placeholder.com/256x192/D4AF37/222?text=Premium+Boxes" alt="Premium Packaging" />
        <h3>Premium Boxes</h3>
        <p>Luxury packaging solutions for high-end products</p>
      </div>
      <div className="package-card">
        <img src="https://via.placeholder.com/256x192/D4AF37/222?text=Custom+Labels" alt="Custom Labels" />
        <h3>Custom Labels</h3>
        <p>Personalized labeling with premium materials</p>
      </div>
      <div className="package-card">
        <img src="https://via.placeholder.com/256x192/D4AF37/222?text=Gift+Wrapping" alt="Gift Wrapping" />
        <h3>Gift Wrapping</h3>
        <p>Elegant wrapping services for special occasions</p>
      </div>
    </div>
  </section>
);

export default PackagingOptions;
