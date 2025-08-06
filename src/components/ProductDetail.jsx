import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';
import '../styles/microinteractions.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [showZoom, setShowZoom] = useState(false);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="error-message">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <button 
            className="back-btn luxury-button gold-ripple"
            onClick={() => navigate('/')}
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Show success feedback
    const btn = document.querySelector('.add-to-cart-btn');
    btn.textContent = 'Added to Cart!';
    btn.classList.add('success');
    setTimeout(() => {
      btn.textContent = 'Add to Cart';
      btn.classList.remove('success');
    }, 2000);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // Mock additional images for gallery
  const productImages = [
    product.image,
    product.image, // In a real app, these would be different angles
    product.image,
    product.image
  ];

  // Enhanced product details based on product type
  const getEnhancedProductDetails = (product) => {
    const baseDetails = {
      keyFeatures: product.specifications || [],
      warranty: "1 Year Manufacturer Warranty",
      shipping: "Free shipping on orders over $50",
      returns: "30-day return policy"
    };

    // Product-specific enhanced details
    const enhancedDetails = {
      1: { // HP LaserJet Pro
        keyFeatures: [
          "Print Speed: 38 pages per minute",
          "Wireless Connectivity: Wi-Fi, USB, Ethernet",
          "Automatic Duplex Printing",
          "Monthly Duty Cycle: 4,000 pages",
          "Energy Star Certified",
          "Mobile Printing Support"
        ],
        techSpecs: {
          "Print Technology": "Laser",
          "Print Speed (Black)": "38 ppm",
          "Print Quality": "Up to 1200 x 1200 dpi",
          "Paper Handling": "250-sheet input tray",
          "Connectivity": "USB 2.0, Ethernet, Wi-Fi",
          "Operating Systems": "Windows, macOS, Linux",
          "Dimensions": "14.2 x 14.3 x 9.0 inches",
          "Weight": "18.7 lbs"
        },
        compatibility: ["Windows 10/11", "macOS 10.15+", "Linux", "Mobile devices"],
        inTheBox: ["HP LaserJet Pro Printer", "Power cord", "USB cable", "Starter toner cartridge", "Installation guide"],
        reviews: [
          { user: "Business Owner", rating: 5, comment: "Excellent printer for office use. Fast and reliable." },
          { user: "Home User", rating: 4, comment: "Great quality prints, easy setup." },
          { user: "Tech Professional", rating: 5, comment: "Perfect for high-volume printing needs." }
        ]
      },
      2: { // Canon PIXMA Inkjet
        keyFeatures: [
          "Vibrant Color Printing",
          "Borderless Photo Printing",
          "Wireless Connectivity",
          "Individual Ink System",
          "Compact Design",
          "Mobile App Support"
        ],
        techSpecs: {
          "Print Technology": "Inkjet",
          "Print Speed (Color)": "15 ppm",
          "Photo Print Speed": "13 seconds per 4x6 photo",
          "Print Quality": "Up to 4800 x 1200 dpi",
          "Paper Handling": "100-sheet rear tray",
          "Connectivity": "USB, Wi-Fi",
          "Ink System": "5 individual ink tanks",
          "Dimensions": "17.2 x 11.7 x 5.6 inches"
        },
        compatibility: ["Windows 10/11", "macOS 10.15+", "iOS", "Android"],
        inTheBox: ["Canon PIXMA Printer", "Power cord", "Setup ink cartridges", "Software CD", "User manual"],
        reviews: [
          { user: "Photographer", rating: 5, comment: "Amazing photo quality, colors are vibrant and accurate." },
          { user: "Student", rating: 4, comment: "Great for documents and occasional photos." },
          { user: "Artist", rating: 5, comment: "Perfect for printing my artwork with excellent color reproduction." }
        ]
      },
      4: { // HP 67XL Ink Cartridge
        keyFeatures: [
          "High-Yield Capacity",
          "Original HP Quality",
          "Easy Installation",
          "Page Yield: 480 pages",
          "Fade-resistant Ink",
          "Compatible with Multiple Models"
        ],
        techSpecs: {
          "Cartridge Type": "High-yield black ink",
          "Page Yield": "480 pages (ISO standard)",
          "Ink Type": "Pigment-based",
          "Compatibility": "HP DeskJet 1255, 2700, 4100 series",
          "Installation": "Drop-in cartridge",
          "Shelf Life": "24 months"
        },
        compatibility: ["HP DeskJet 1255", "HP DeskJet 2700 series", "HP DeskJet 4100 series"],
        inTheBox: ["HP 67XL Black Ink Cartridge", "Installation instructions"],
        reviews: [
          { user: "Office Manager", rating: 5, comment: "Long-lasting cartridge, great value for money." },
          { user: "Home User", rating: 4, comment: "Easy to install, prints clearly." },
          { user: "Small Business", rating: 5, comment: "Reliable ink cartridge, consistent quality." }
        ]
      }
    };

    // Default enhanced details for products not specifically defined
    const defaultEnhanced = {
      keyFeatures: product.specifications || [],
      techSpecs: {
        "Product Type": product.category,
        "Brand": product.brand,
        "Model": product.name,
        "In Stock": product.inStock ? "Yes" : "No"
      },
      compatibility: ["Universal compatibility"],
      inTheBox: [product.name, "Documentation"],
      reviews: [
        { user: "Verified Buyer", rating: product.rating, comment: "Great product, exactly as described." }
      ]
    };

    return {
      ...baseDetails,
      ...(enhancedDetails[product.id] || defaultEnhanced)
    };
  };

  const productDetails = getEnhancedProductDetails(product);

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-detail-container">
      {/* Back Navigation */}
      <div className="breadcrumb">
        <button 
          className="back-btn text-glow gold-ripple"
          onClick={() => navigate('/')}
        >
          ← Back to Products
        </button>
        <span className="breadcrumb-text">
          Products / {product.category} / {product.name}
        </span>
      </div>

      {/* Product Detail Section */}
      <div className="product-detail-content">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <img 
              src={productImages[selectedImage]} 
              alt={product.name}
              className="main-product-image floating"
              onClick={() => setShowZoom(true)}
            />
            {!product.inStock && (
              <div className="out-of-stock-overlay">
                <span>Out of Stock</span>
              </div>
            )}
            <button className="zoom-btn gold-ripple" onClick={() => setShowZoom(true)}>
              🔍 Zoom
            </button>
          </div>
          <div className="image-thumbnails">
            {productImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} view ${index + 1}`}
                className={`thumbnail ${selectedImage === index ? 'active' : ''} gold-ripple`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div className="product-header">
            <h1 className="product-title text-glow">{product.name}</h1>
            <div className="product-brand">{product.brand}</div>
            <div className="product-rating">
              <span className="stars">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </span>
              <span className="rating-value">({product.rating}) • {productDetails.reviews.length} reviews</span>
            </div>
          </div>

          <div className="product-price-section">
            <div className="pricing">
              <span className="price">${product.price}</span>
              <span className="price-info">
                {product.price > 50 ? "✓ Free Shipping" : "Shipping: $5.99"}
              </span>
            </div>
            <div className="stock-info">
              {product.inStock ? (
                <span className="in-stock">✓ In Stock - Ready to ship</span>
              ) : (
                <span className="out-of-stock">✗ Out of Stock</span>
              )}
            </div>
          </div>

          <div className="product-description">
            <h3>Product Overview</h3>
            <p>{product.description}</p>
          </div>

          {/* Key Features Highlight */}
          <div className="key-features">
            <h3>Key Features</h3>
            <div className="features-grid">
              {productDetails.keyFeatures.slice(0, 6).map((feature, index) => (
                <div key={index} className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="purchase-section">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn luxury-button gold-ripple"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  className="quantity-btn luxury-button gold-ripple"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
            </div>

            <div className="purchase-buttons">
              <button 
                className="add-to-cart-btn luxury-button gold-ripple"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
              </button>
              <button className="wishlist-btn luxury-button gold-ripple">
                ❤️ Add to Wishlist
              </button>
            </div>

            <div className="total-price">
              Total: <span className="total-amount">${(product.price * quantity).toFixed(2)}</span>
            </div>

            <div className="purchase-benefits">
              <div className="benefit">🚚 {productDetails.shipping}</div>
              <div className="benefit">🔄 {productDetails.returns}</div>
              <div className="benefit">🛡️ {productDetails.warranty}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Product Information Tabs */}
      <div className="product-tabs-section">
        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''} luxury-button gold-ripple`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''} luxury-button gold-ripple`}
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </button>
          <button 
            className={`tab-btn ${activeTab === 'compatibility' ? 'active' : ''} luxury-button gold-ripple`}
            onClick={() => setActiveTab('compatibility')}
          >
            Compatibility
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''} luxury-button gold-ripple`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({productDetails.reviews.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'support' ? 'active' : ''} luxury-button gold-ripple`}
            onClick={() => setActiveTab('support')}
          >
            Support
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="tab-pane overview-tab">
              <div className="overview-grid">
                <div className="overview-section">
                  <h3>Product Highlights</h3>
                  <div className="highlights-grid">
                    {productDetails.keyFeatures.map((feature, index) => (
                      <div key={index} className="highlight-item">
                        <span className="highlight-icon">✨</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="overview-section">
                  <h3>What's in the Box</h3>
                  <ul className="box-contents">
                    {productDetails.inTheBox.map((item, index) => (
                      <li key={index}>
                        <span className="box-icon">📦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="overview-section">
                  <h3>Product Benefits</h3>
                  <div className="benefits-list">
                    <div className="benefit-item">
                      <span className="benefit-icon">🚀</span>
                      <div>
                        <strong>High Performance</strong>
                        <p>Designed for efficiency and reliability in professional environments.</p>
                      </div>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">💰</span>
                      <div>
                        <strong>Cost Effective</strong>
                        <p>Excellent value for money with long-lasting performance.</p>
                      </div>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">🔧</span>
                      <div>
                        <strong>Easy Setup</strong>
                        <p>Quick and simple installation process.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="tab-pane specifications-tab">
              <h3>Technical Specifications</h3>
              <div className="specs-table">
                {Object.entries(productDetails.techSpecs).map(([key, value]) => (
                  <div key={key} className="spec-row">
                    <div className="spec-label">{key}</div>
                    <div className="spec-value">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'compatibility' && (
            <div className="tab-pane compatibility-tab">
              <h3>Compatibility Information</h3>
              <div className="compatibility-grid">
                <div className="compatibility-section">
                  <h4>Compatible Systems</h4>
                  <div className="compatibility-list">
                    {productDetails.compatibility.map((item, index) => (
                      <div key={index} className="compatibility-item">
                        <span className="compatibility-icon">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="compatibility-section">
                  <h4>System Requirements</h4>
                  <div className="requirements-list">
                    <div className="requirement-item">
                      <strong>Operating System:</strong> Windows 10 or later, macOS 10.15 or later
                    </div>
                    <div className="requirement-item">
                      <strong>Memory:</strong> 4GB RAM minimum, 8GB recommended
                    </div>
                    <div className="requirement-item">
                      <strong>Storage:</strong> 500MB available space
                    </div>
                    <div className="requirement-item">
                      <strong>Connectivity:</strong> USB 2.0 or Wi-Fi connection
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="tab-pane reviews-tab">
              <div className="reviews-header">
                <h3>Customer Reviews</h3>
                <div className="reviews-summary">
                  <div className="rating-breakdown">
                    <span className="overall-rating">{product.rating}</span>
                    <div className="stars-large">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span className="reviews-count">Based on {productDetails.reviews.length} reviews</span>
                  </div>
                </div>
              </div>
              
              <div className="reviews-list">
                {productDetails.reviews.map((review, index) => (
                  <div key={index} className="review-item">
                    <div className="review-header">
                      <span className="reviewer-name">{review.user}</span>
                      <div className="review-rating">
                        {'★'.repeat(review.rating)}
                        {'☆'.repeat(5 - review.rating)}
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                    <div className="review-date">Verified Purchase • 2 weeks ago</div>
                  </div>
                ))}
              </div>

              <div className="write-review">
                <button className="write-review-btn luxury-button gold-ripple">
                  ✍️ Write a Review
                </button>
              </div>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="tab-pane support-tab">
              <div className="support-grid">
                <div className="support-section">
                  <h3>Product Support</h3>
                  <div className="support-options">
                    <div className="support-item">
                      <span className="support-icon">📞</span>
                      <div>
                        <strong>Phone Support</strong>
                        <p>1-800-LUXURY-PRINT<br />Mon-Fri 9AM-6PM EST</p>
                      </div>
                    </div>
                    <div className="support-item">
                      <span className="support-icon">💬</span>
                      <div>
                        <strong>Live Chat</strong>
                        <p>Available 24/7 for instant assistance</p>
                      </div>
                    </div>
                    <div className="support-item">
                      <span className="support-icon">📧</span>
                      <div>
                        <strong>Email Support</strong>
                        <p>support@luxuryprinter.com<br />Response within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="support-section">
                  <h3>Downloads & Resources</h3>
                  <div className="resources-list">
                    <a href="#" className="resource-item gold-ripple">
                      <span className="resource-icon">📄</span>
                      <span>User Manual (PDF)</span>
                      <span className="download-icon">⬇️</span>
                    </a>
                    <a href="#" className="resource-item gold-ripple">
                      <span className="resource-icon">💿</span>
                      <span>Driver Software</span>
                      <span className="download-icon">⬇️</span>
                    </a>
                    <a href="#" className="resource-item gold-ripple">
                      <span className="resource-icon">🔧</span>
                      <span>Setup Guide</span>
                      <span className="download-icon">⬇️</span>
                    </a>
                    <a href="#" className="resource-item gold-ripple">
                      <span className="resource-icon">❓</span>
                      <span>FAQ & Troubleshooting</span>
                      <span className="download-icon">⬇️</span>
                    </a>
                  </div>
                </div>

                <div className="support-section">
                  <h3>Warranty Information</h3>
                  <div className="warranty-info">
                    <p><strong>Coverage:</strong> {productDetails.warranty}</p>
                    <p><strong>What's Covered:</strong> Manufacturing defects, hardware failures</p>
                    <p><strong>What's Not Covered:</strong> Physical damage, misuse, normal wear</p>
                    <p><strong>Registration:</strong> Register your product online for full warranty coverage</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Zoom Modal */}
      {showZoom && (
        <div className="zoom-modal" onClick={() => setShowZoom(false)}>
          <div className="zoom-content">
            <img src={productImages[selectedImage]} alt={product.name} className="zoomed-image" />
            <button className="close-zoom" onClick={() => setShowZoom(false)}>✕</button>
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h2 className="section-title text-glow">Related Products</h2>
          <div className="related-grid">
            {relatedProducts.map(relatedProduct => (
              <div 
                key={relatedProduct.id} 
                className="related-item luxury-card gold-ripple"
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
              >
                <img 
                  src={relatedProduct.image} 
                  alt={relatedProduct.name}
                  className="related-image"
                />
                <h4>{relatedProduct.name}</h4>
                <p className="related-price">${relatedProduct.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
