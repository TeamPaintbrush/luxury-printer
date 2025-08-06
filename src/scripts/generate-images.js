// Script to generate all product images at once
import { generateOpenAIImage } from '../utils/openai.js';

const products = [
  {
    name: "HP LaserJet Pro",
    prompt: "A luxury HP LaserJet Pro printer on a gold and charcoal background, product photo, high quality",
    filename: "hp-laserjet-pro.jpg"
  },
  {
    name: "Canon PIXMA Inkjet",
    prompt: "Canon PIXMA inkjet printer, luxury, gold and charcoal, product photo, high quality",
    filename: "canon-pixma-inkjet.jpg"
  },
  {
    name: "Brother HL-L2350DW",
    prompt: "Brother HL-L2350DW laser printer, luxury, gold and charcoal, product photo, high quality",
    filename: "brother-hl-l2350dw.jpg"
  },
  {
    name: "HP 67XL Ink Cartridge",
    prompt: "HP 67XL ink cartridge, luxury packaging, gold and charcoal, product photo, high quality",
    filename: "hp-67xl-ink.jpg"
  },
  {
    name: "Canon 281 Ink",
    prompt: "Canon 281 ink cartridge, luxury packaging, gold and charcoal, product photo, high quality",
    filename: "canon-281-ink.jpg"
  },
  {
    name: "Epson 502 Ink",
    prompt: "Epson 502 ink cartridge, luxury packaging, gold and charcoal, product photo, high quality",
    filename: "epson-502-ink.jpg"
  },
  {
    name: "Glossy Photo Paper",
    prompt: "Glossy photo paper pack, luxury style, gold and charcoal, product photo, high quality",
    filename: "glossy-photo-paper.jpg"
  },
  {
    name: "Multipurpose Copy Paper",
    prompt: "Multipurpose copy paper ream, luxury packaging, gold and charcoal, product photo, high quality",
    filename: "multipurpose-copy-paper.jpg"
  },
  {
    name: "Label Sheets",
    prompt: "Label sheets for printers, luxury packaging, gold and charcoal, product photo, high quality",
    filename: "label-sheets.jpg"
  }
];

async function generateAllImages() {
  console.log('Starting image generation for all products...');
  
  for (const product of products) {
    console.log(`\n--- Generating ${product.name} ---`);
    console.log(`Prompt: ${product.prompt}`);
    
    try {
      const imageUrl = await generateOpenAIImage(product.prompt);
      if (imageUrl && !imageUrl.startsWith('ERROR:')) {
        console.log(`✅ Success! Image URL: ${imageUrl}`);
        console.log(`📁 Save as: public/product-images/${product.filename}`);
        console.log(`🔗 Download link: ${imageUrl}`);
      } else {
        console.log(`❌ Failed to generate image: ${imageUrl}`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
    
    // Wait 2 seconds between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n🎉 All image generation attempts completed!');
  console.log('Download each image from the URLs above and save them in public/product-images/');
}

// Run the function
generateAllImages();
