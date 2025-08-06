import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import Lightbox from "./Lightbox";
import "./FeaturedProducts.css";
import "../styles/microinteractions.css";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { filteredProducts } = useProducts();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price) => `$${price.toFixed(2)}`;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star">☆</span>);
    }
    
    return stars;
  };

  const handleImageClick = (product, index) => {
    const images = [{
      src: product.image,
      alt: product.name,
      title: product.name,
      description: product.description
    }];
    
    setLightboxImages(images);
    setCurrentImageIndex(0);
    setLightboxOpen(true);
  };

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  };

  return (
    <section className="featured-section">
      <h2>Featured Products</h2>
      <div className="product-grid">
        {filteredProducts.map((product, index) => (
          <div className="product-card card-tilt gold-shimmer gradient-border" key={product.id}>
            <div className="product-image-container image-zoom">
              <img 
                src={product.image} 
                alt={product.name}
                onClick={() => handleImageClick(product, index)}
                className="product-image"
              />
              {!product.inStock && <div className="out-of-stock-badge floating">Out of Stock</div>}
              <div className="image-overlay">
                <button 
                  className="quick-view-btn luxury-button gold-ripple"
                  onClick={() => handleImageClick(product, index)}
                >
                  🔍 Quick View
                </button>
              </div>
            </div>
            
            <div className="product-info">
              <h3 className="text-glow">{product.name}</h3>
              
              <div className="product-rating">
                {renderStars(product.rating)}
                <span className="rating-text">({product.rating})</span>
              </div>
              
              <p className="product-price">{formatPrice(product.price)}</p>
              <p className="product-description">{product.description}</p>
              
              <div className="product-specs">
                <h4>Specifications:</h4>
                <ul>
                  {product.specifications.slice(0, 2).map((spec, i) => (
                    <li key={i}>{spec}</li>
                  ))}
                </ul>
              </div>
              
              <div className="product-actions">
                <button 
                  className="view-details-btn luxury-button gold-ripple"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  📋 View Details
                </button>
                <button 
                  className={`add-to-cart-btn luxury-button gold-ripple ${!product.inStock ? 'disabled' : ''}`}
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                >
                  {product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        currentIndex={currentImageIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
};

export default FeaturedProducts;
