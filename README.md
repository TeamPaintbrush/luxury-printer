# Luxury Printer - Premium E-commerce Website

A luxury-themed e-commerce website for printers, ink cartridges, and packaging supplies built with React. Features a gold-themed UI inspired by luxury hotels, with advanced product filtering, shopping cart functionality, and comprehensive product detail pages.

## 🌟 Features

- **Luxury UI Design**: Gold-themed interface with particle background effects and micro-interactions
- **Product Catalog**: Complete product listings with images, ratings, and detailed specifications
- **Advanced Filtering**: Real-time search, category/brand/price filters, and sorting options
- **Shopping Cart**: Full cart functionality with item management and quantity controls
- **Product Details**: Comprehensive product pages with tabs, image zoom, reviews, and support information
- **Responsive Design**: Mobile-first approach that works on all devices
- **Smooth Navigation**: Scroll-to-section navigation and smooth transitions

## 🚀 Technologies Used

- **Frontend**: React (Create React App)
- **Styling**: CSS3 with custom animations and micro-interactions
- **Routing**: React Router DOM for navigation
- **State Management**: React Context API
- **Icons & Fonts**: Custom styling with luxury typography

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TeamPaintbrush/luxury-printer.git
   cd luxury-printer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🎨 Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.jsx      # Navigation header
│   ├── Hero.jsx        # Landing banner
│   ├── FeaturedProducts.jsx  # Product grid
│   ├── ProductDetail.jsx     # Individual product pages
│   ├── ShoppingCart.jsx      # Cart functionality
│   └── ...
├── context/            # React Context for state management
├── styles/             # CSS files and animations
└── images/             # Static assets
```

## 🛠️ Available Scripts

### `npm start`
Runs the app in development mode. The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder with optimized performance.

### `npm run eject`
**Note: This is a one-way operation!** Removes the single build dependency and copies configuration files.

## 🎯 Key Components

- **Product Filter**: Advanced filtering with search, categories, price ranges
- **Product Details**: Tabbed interface with specifications, compatibility, reviews
- **Shopping Cart**: Persistent cart with quantity management
- **Visual Effects**: Gold particle background, shimmer effects, hover animations

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎨 Design Features

- **Gold Theme**: Luxury color palette with #D4AF37 gold accents
- **Particle Background**: Animated gold particles for visual appeal
- **Micro-interactions**: Hover effects, ripple animations, and smooth transitions
- **Typography**: Playfair Display for headings, clean sans-serif for body text

## 🚀 Deployment

### Option 1: Netlify (Recommended - Easiest)

1. **Visit [Netlify](https://www.netlify.com/)** and sign up with your GitHub account
2. **Connect your repository**:
   - Click "New site from Git"
   - Choose GitHub and authorize Netlify
   - Select the `TeamPaintbrush/luxury-printer` repository
3. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `build`
   - Click "Deploy site"
4. **Your site will be live** at a URL like `https://amazing-site-name.netlify.app`
5. **Optional**: Set up a custom domain in Netlify settings

### Option 2: Vercel (Great for React)

1. **Visit [Vercel](https://vercel.com/)** and sign up with GitHub
2. **Import your repository**:
   - Click "New Project"
   - Import `TeamPaintbrush/luxury-printer`
   - Vercel auto-detects React settings
3. **Deploy**: Click "Deploy" - it handles everything automatically
4. **Live site** at `https://your-project.vercel.app`

### Option 3: GitHub Pages (Free hosting)

1. **Build the project**:
   ```bash
   npm install -g gh-pages
   npm run build
   npx gh-pages -d build
   ```
2. **Enable GitHub Pages** in repository settings
3. **Live at**: `https://teampaintbrush.github.io/luxury-printer`

### Option 4: Manual Build & Host

1. **Create production build**:
   ```bash
   npm run build
   ```
2. **Upload the `build` folder** to any web hosting service
3. **Point domain** to the uploaded files

The project can be deployed to various platforms:
- **Netlify**: Connect your GitHub repo for automatic deployments
- **Vercel**: Perfect for React applications
- **GitHub Pages**: For static hosting

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/TeamPaintbrush/luxury-printer/issues).

## 📞 Support

For support and questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ by TeamPaintbrush**
