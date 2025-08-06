import React from "react";
import "./ProductFilter.css";

const ProductFilter = () => (
  <section className="filter-section">
    <form className="filter-form">
      <select><option>Printer Type</option><option>Laser</option><option>Inkjet</option></select>
      <select><option>Brand</option><option>HP</option><option>Canon</option><option>Brother</option></select>
      <select><option>Ink or Toner</option><option>Ink</option><option>Toner</option></select>
      <select><option>Paper Type</option><option>Standard</option><option>Glossy</option><option>Label</option></select>
      <button type="submit">Filter</button>
    </form>
  </section>
);

export default ProductFilter;
