import React, { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

const initialProducts = [
  {
    id: 1,
    name: "HP LaserJet Pro",
    price: 299,
    description: "Fast, reliable laser printing for home or office. Wireless, duplex, and energy efficient.",
    image: process.env.PUBLIC_URL + "/product-images/HP LaserJet Pro.png",
    specifications: ["Print Speed: 38ppm", "Wireless: Yes", "Duplex: Automatic", "Monthly Volume: 4000 pages"],
    inStock: true,
    rating: 4.5,
    category: "laser",
    brand: "HP"
  },
  {
    id: 2,
    name: "Canon PIXMA Inkjet",
    price: 249,
    description: "Vivid color inkjet prints, borderless photos, and wireless connectivity in a compact design.",
    image: process.env.PUBLIC_URL + "/product-images/Canon PIXMA Inkjet.png",
    specifications: ["Print Speed: 15ppm", "Photo Print: Yes", "Wireless: Yes", "Ink System: Individual"],
    inStock: true,
    rating: 4.3,
    category: "inkjet",
    brand: "Canon"
  },
  {
    id: 3,
    name: "Brother HL-L2350DW",
    price: 199,
    description: "Monochrome laser printer with fast print speeds, wireless setup, and robust build.",
    image: process.env.PUBLIC_URL + "/product-images/Brother HL-L2350DW.png",
    specifications: ["Print Speed: 32ppm", "Wireless: Yes", "Type: Monochrome", "Memory: 32MB"],
    inStock: true,
    rating: 4.4,
    category: "laser",
    brand: "Brother"
  },
  {
    id: 4,
    name: "HP 67XL Ink Cartridge",
    price: 39,
    description: "High-yield black ink cartridge for crisp, long-lasting prints. Compatible with HP DeskJet series.",
    image: process.env.PUBLIC_URL + "/product-images/HP 67XL Ink Cartridge.png",
    specifications: ["Type: Black Ink", "Yield: 480 pages", "Compatible: HP DeskJet", "XL Capacity: Yes"],
    inStock: true,
    rating: 4.2,
    category: "ink",
    brand: "HP"
  },
  {
    id: 5,
    name: "Canon 281 Ink",
    price: 35,
    description: "Premium color ink for Canon PIXMA printers. Sharp, vibrant results for photos and documents.",
    image: process.env.PUBLIC_URL + "/product-images/Canon 281 Ink.png",
    specifications: ["Type: Color Set", "Colors: 4-pack", "Compatible: Canon PIXMA", "Page Yield: 300"],
    inStock: false,
    rating: 4.1,
    category: "ink",
    brand: "Canon"
  },
  {
    id: 6,
    name: "Epson 502 Ink",
    price: 32,
    description: "EcoTank-compatible ink for high-volume, cost-effective color printing.",
    image: process.env.PUBLIC_URL + "/product-images/Epson 502 Ink.png",
    specifications: ["Type: EcoTank", "Volume: High", "Compatible: Epson ET series", "Colors: CMYK"],
    inStock: true,
    rating: 4.6,
    category: "ink",
    brand: "Epson"
  },
  {
    id: 7,
    name: "Glossy Photo Paper",
    price: 19,
    description: "Premium glossy paper for stunning photo prints. Quick-dry, smudge-resistant finish.",
    image: process.env.PUBLIC_URL + "/product-images/Glossy Photo Paper.png",
    specifications: ["Size: 4x6 inches", "Count: 100 sheets", "Weight: 250gsm", "Finish: Glossy"],
    inStock: true,
    rating: 4.7,
    category: "paper",
    brand: "Generic"
  },
  {
    id: 8,
    name: "Multipurpose Copy Paper",
    price: 12,
    description: "Bright white, jam-free copy paper for everyday printing and copying needs.",
    image: process.env.PUBLIC_URL + "/product-images/Multipurpose Copy Paper.png",
    specifications: ["Size: 8.5x11 inches", "Count: 500 sheets", "Weight: 20lb", "Brightness: 96"],
    inStock: true,
    rating: 4.0,
    category: "paper",
    brand: "Generic"
  },
  {
    id: 9,
    name: "Label Sheets",
    price: 15,
    description: "Versatile label sheets for inkjet and laser printers. Easy-peel, strong adhesive.",
    image: process.env.PUBLIC_URL + "/product-images/Label Sheets.png",
    specifications: ["Size: 8.5x11 inches", "Labels per sheet: 30", "Count: 25 sheets", "Type: Address"],
    inStock: true,
    rating: 4.3,
    category: "paper",
    brand: "Generic"
  },
];

export const ProductProvider = ({ children }) => {
  const [products] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  const value = {
    products,
    filteredProducts,
    setFilteredProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext };
