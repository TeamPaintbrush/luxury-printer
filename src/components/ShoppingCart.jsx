import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './ShoppingCart.css';
import '../styles/microinteractions.css';

const ShoppingCart = () => {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const formatPrice = (price) => `$${price.toFixed(2)}`;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <>
      {/* Cart Toggle Button */}
      <button 
        className="cart-toggle floating gold-ripple"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle shopping cart"
      >
        <span className="cart-icon interactive-icon">🛒</span>
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </button>

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isOpen ? 'cart-open' : ''}`}>
        <div className="cart-header">
          <h3>Shopping Cart</h3>
          <button 
            className="cart-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty</p>
              <span className="cart-empty-icon">🛍️</span>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p className="cart-item-price">{formatPrice(item.price)}</p>
                      
                      <div className="quantity-controls">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="cart-item-total">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                    
                    <button 
                      className="remove-item"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <strong>Total: {formatPrice(totalPrice)}</strong>
                </div>
                
                <div className="cart-actions">
                  <button 
                    className="clear-cart-btn luxury-button gold-ripple"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                  <button className="checkout-btn luxury-button gold-ripple">
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="cart-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default ShoppingCart;
