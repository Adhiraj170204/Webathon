# IITMART - Online Grocery Store

IITMART is a modern e-commerce platform for groceries built with React and Vite. This project provides a complete shopping experience with product browsing, cart management, user authentication, and order tracking.

## Features

- Responsive design for all devices
- Product browsing and filtering
- User authentication (customer and seller)
- Shopping cart and wishlist management
- Checkout process
- Order tracking
- Seller dashboard
- Mobile app download options

## Tech Stack

- React 19
- React Router
- Tailwind CSS
- Vite
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/iitmart.git
   cd iitmart
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

## Deployment

### Build for Production

```
npm run build
```

This will generate optimized files in the `dist` directory.

### Deployment Options

#### Vercel or Netlify (Recommended)
- Connect your repository and deploy with zero configuration

#### Traditional Hosting
- Upload the contents of the `dist` directory to your web server

#### GitHub Pages
1. Update `vite.config.js` with your repository name:
   ```js
   base: '/your-repo-name/'
   ```
2. Run the build command
3. Deploy using GitHub Pages workflow

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
