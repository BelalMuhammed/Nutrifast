<div align="center">
	<img src="public/logo-light.png" alt="Nutrifast Logo" width="120"/>
	<h1>Nutrifast</h1>
	<p><strong>Modern Nutrition & Meal Delivery Platform</strong></p>
</div>

---



---

## About Nutrifast

Nutrifast is a modern web application for nutrition-focused meal delivery. It offers users a seamless experience to browse, filter, and order healthy meals, manage their cart and wishlist, and track their orders. The platform is designed for performance, scalability, and a delightful user experience.

## Features

- 🛒 **Cart & Wishlist**: Persistent cart/wishlist with add/remove and auto-load.
- 🔒 **Authentication**: Secure login, registration, and session management.
- 📦 **Order Management**: View, track, and manage your orders.
- 🥗 **Product Catalog**: Browse meals, filter by calories, categories, and more.
- ⭐ **Customer Favorites**: Highlighted popular meals and user favorites.
- 📊 **Dashboard**: Admin dashboard for managing products, categories, and orders.
- 📱 **Responsive Design**: Fully optimized for mobile and desktop.
- 🔔 **Notifications**: Real-time toast notifications and user feedback.
- 🧩 **Modular Components**: Reusable, well-structured React components.

## Tech Stack

- **Frontend**: React, Vite, JavaScript (ES6+), CSS Modules
- **State Management**: Redux Toolkit
- **API**: Axios
- **Routing**: React Router
- **Linting**: ESLint
- **Other**: Context API, Custom Hooks, Modern CSS

## Getting Started

### Installation

```bash
# Clone the repository
$ git clone https://github.com/BelalMuhammed/Nutrifast.git
$ cd Nutrifast

# Install dependencies
$ npm install
# or

```

### Running the App

```bash
# Start the development server
$ npm run dev
# or
$ yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

## Project Structure

```
Nutrifast/
├── public/                # Static assets (images, icons, manifest)
├── src/
│   ├── Api/               # API services (Axios, cart, wishlist)
│   ├── assets/            # Images and static resources
│   ├── Components/        # Reusable UI components
│   │   ├── categoryCard/           # Category cards
│   │   ├── customerFavCard/        # Customer favorite cards
│   │   ├── Footer/                 # Footer and highlights
│   │   ├── homepage/               # Homepage sections
│   │   ├── layout/                 # Layout components
│   │   ├── navbar/                 # Navigation bar components
│   │   ├── productDetail/          # Product details, reviews, related
│   │   ├── shared/                 # Shared UI (buttons, loaders, etc.)
│   │   ├── shop/                   # Shop filters, product grid, etc.
│   │   ├── test/                   # CartWishlistTest.jsx (for dev/test only)
│   │   ├── ui/                     # UI primitives (Button, Table, etc.)
│   │   └── whyChooseNutriFast/     # Why choose us section
│   ├── contexts/          # React Context providers
│   ├── dashboard/         # Admin dashboard (layout, pages, components)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   ├── Network/           # Network interceptors
│   ├── Pages/             # Main app pages (Home, Cart, Auth, etc.)
│   ├── Redux/             # Redux store, slices, middleware
│   ├── routes/            # App routing
│   ├── utlis/             # Utility functions (filtering, sorting)
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── ...
├── package.json           # Project metadata & scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```


## Scripts

- `npm run dev` — Start development server

## Contributing

Contributions are welcome! Please follow these steps:

1. clone the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss what you would like to change.

## License

**No LICENSE file found.**

This project currently does not include a license file. If you intend to make this project open source, please add a LICENSE file (MIT, Apache 2.0, etc.) to clarify usage rights.
