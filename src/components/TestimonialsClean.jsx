import React from "react";
import "./Testimonials.css";

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Luxury Brands Inc.",
    text: "Exceptional quality and service. Our packaging has never looked better."
  },
  {
    name: "Michael Chen", 
    company: "Premium Cosmetics",
    text: "The attention to detail and luxury finish exceeded our expectations."
  },
  {
    name: "Emily Rodriguez",
    company: "Elite Jewelry", 
    text: "Professional, elegant, and perfectly executed. Highly recommended."
  }
];

const Testimonials = () => (
  <section className="testimonials-section">
    <h2>Client Testimonials</h2>
    <div className="testimonials-grid">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="testimonial-card">
          <p>"{testimonial.text}"</p>
          <div className="testimonial-author">
            <strong>{testimonial.name}</strong>
            <span>{testimonial.company}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
