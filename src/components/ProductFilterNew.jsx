import React, { useState, useEffect, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import './ProductFilterNew.css';
import '../styles/microinteractions.css';

const ProductFilter = () => {
  const { products, setFilteredProducts, filteredProducts } = useProducts();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [inStock, setInStock] = useState(false);
  const [minRating, setMinRating] = useState(0);
  
  // Filter visibility states
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterBarCollapsed, setIsFilterBarCollapsed] = useState(true);

  // Extract unique values for dropdowns
  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))];
    return cats.filter(Boolean);
  }, [products]);

  const brands = useMemo(() => {
    const brandList = [...new Set(products.map(p => p.brand))];
    return brandList.filter(Boolean);
  }, [products]);

  const priceExtents = useMemo(() => {
    const prices = products.map(p => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }, [products]);

  // Real-time filtering effect
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.specifications || []).some(spec => 
          spec.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Stock filter
    if (inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(product => product.rating >= minRating);
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProducts(filtered);
  }, [
    products, searchTerm, selectedCategory, selectedBrand, 
    priceRange, sortBy, sortOrder, inStock, minRating, setFilteredProducts
  ]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange({ min: priceExtents.min, max: priceExtents.max });
    setSortBy('name');
    setSortOrder('asc');
    setInStock(false);
    setMinRating(0);
  };

  const activeFiltersCount = [
    searchTerm,
    selectedCategory !== 'all',
    selectedBrand !== 'all',
    priceRange.min !== priceExtents.min || priceRange.max !== priceExtents.max,
    inStock,
    minRating > 0
  ].filter(Boolean).length;

  return (
    <section className="product-filter-section">
      <div className="filter-container">
        {/* Main Filter Bar Collapse Toggle */}
        <div className="filter-header">
          <button 
            className="filter-collapse-toggle luxury-button gold-ripple"
            onClick={() => setIsFilterBarCollapsed(!isFilterBarCollapsed)}
            aria-label={isFilterBarCollapsed ? "Expand filters" : "Collapse filters"}
          >
            <span className="filter-icon">🔍</span>
            <span className="filter-title">Product Filters</span>
            {activeFiltersCount > 0 && (
              <span className="filter-badge">{activeFiltersCount}</span>
            )}
            <span className={`arrow ${isFilterBarCollapsed ? 'down' : 'up'}`}>
              {isFilterBarCollapsed ? '▼' : '▲'}
            </span>
          </button>
          <div className="results-count-header">
            {filteredProducts.length} of {products.length} products
          </div>
        </div>

        {/* Collapsible Filter Content */}
        <div className={`filter-content ${isFilterBarCollapsed ? 'collapsed' : 'expanded'}`}>
          {/* Mobile Filter Toggle */}
          <button 
            className="mobile-filter-toggle luxury-button gold-ripple"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            aria-label="Toggle filters"
          >
            <span className="filter-icon">🔍</span>
            Filters
            {activeFiltersCount > 0 && (
              <span className="filter-badge">{activeFiltersCount}</span>
            )}
          </button>

          <div className={`filter-panel ${isFilterOpen ? 'open' : ''}`}>
          {/* Search Bar */}
          <div className="filter-group">
            <label htmlFor="search" className="filter-label">
              Search Products
            </label>
            <div className="search-container">
              <input
                id="search"
                type="text"
                placeholder="Search products, brands, features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input gold-shimmer"
                aria-describedby="search-help"
              />
              <span className="search-icon">🔍</span>
              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            <small id="search-help" className="filter-help">
              Search by product name, description, or features
            </small>
          </div>

          {/* Quick Filters Row */}
          <div className="quick-filters">
            <div className="filter-group inline">
              <label htmlFor="category" className="filter-label">Category</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select luxury-button"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="filter-group inline">
              <label htmlFor="brand" className="filter-label">Brand</label>
              <select
                id="brand"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="filter-select luxury-button"
              >
                <option value="all">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div className="filter-group inline">
              <label htmlFor="sort" className="filter-label">Sort By</label>
              <select
                id="sort"
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="filter-select luxury-button"
              >
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="price-asc">Price Low-High</option>
                <option value="price-desc">Price High-Low</option>
                <option value="rating-desc">Rating High-Low</option>
                <option value="rating-asc">Rating Low-High</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <button
            className="advanced-toggle text-glow gold-ripple"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            aria-expanded={showAdvancedFilters}
          >
            Advanced Filters
            <span className={`arrow ${showAdvancedFilters ? 'up' : 'down'}`}>
              {showAdvancedFilters ? '▲' : '▼'}
            </span>
          </button>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="advanced-filters">
              {/* Price Range */}
              <div className="filter-group">
                <label className="filter-label">
                  Price Range: ${priceRange.min} - ${priceRange.max}
                </label>
                <div className="price-range-container">
                  <input
                    type="range"
                    min={priceExtents.min}
                    max={priceExtents.max}
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                    className="price-slider min-price"
                    aria-label="Minimum price"
                  />
                  <input
                    type="range"
                    min={priceExtents.min}
                    max={priceExtents.max}
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                    className="price-slider max-price"
                    aria-label="Maximum price"
                  />
                </div>
                <div className="price-inputs">
                  <input
                    type="number"
                    min={priceExtents.min}
                    max={priceExtents.max}
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                    className="price-input"
                    aria-label="Minimum price input"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    min={priceExtents.min}
                    max={priceExtents.max}
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 0 }))}
                    className="price-input"
                    aria-label="Maximum price input"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="filter-group">
                <label className="filter-label">Minimum Rating</label>
                <div className="rating-filter">
                  {[0, 1, 2, 3, 4, 5].map(rating => (
                    <button
                      key={rating}
                      className={`rating-btn ${minRating === rating ? 'active' : ''}`}
                      onClick={() => setMinRating(rating)}
                      aria-label={`Filter by ${rating} stars and above`}
                    >
                      {rating === 0 ? 'Any' : '★'.repeat(rating)}
                      {rating > 0 && '+'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock Filter */}
              <div className="filter-group">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="stock-checkbox"
                  />
                  <span className="checkmark"></span>
                  Show only items in stock
                </label>
              </div>
            </div>
          )}

          {/* Filter Actions */}
          <div className="filter-actions">
            <button
              className="clear-filters luxury-button gold-ripple"
              onClick={clearAllFilters}
              disabled={activeFiltersCount === 0}
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Filter Overlay for Mobile */}
        {isFilterOpen && (
          <div 
            className="filter-overlay"
            onClick={() => setIsFilterOpen(false)}
          />
        )}
        </div>
      </div>
    </section>
  );
};

export default ProductFilter;
