import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductFilterNew from "./components/ProductFilterNew";
import FeaturedProducts from "./components/FeaturedProducts";
import About from "./components/About";
import PackagingOptions from "./components/PackagingOptions";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import ShoppingCart from "./components/ShoppingCart";
import BackToTop from "./components/BackToTop";
import ParticleBackground from "./components/ParticleBackground";
import ProductDetail from "./components/ProductDetail";

// Main Home Page Component
const HomePage = () => (
  <>
    <section id="home">
      <Hero />
    </section>
    <section id="products">
      <ProductFilterNew />
      <FeaturedProducts />
    </section>
    <section id="about">
      <About />
      <PackagingOptions />
    </section>
    <section id="gallery">
      <Gallery />
      <Testimonials />
    </section>
    <section id="contact">
      <Footer />
    </section>
  </>
);

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Router basename="/luxury-printer">
          <div className="App">
            <ParticleBackground />
            <Navbar />
            <ShoppingCart />
            
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
            
            <BackToTop />
          </div>
        </Router>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
