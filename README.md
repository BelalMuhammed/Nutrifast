<div align="center">
	<img src="public/logo-light.png" alt="Nutrifast Logo" width="120"/>
	<h1>Nutrifast</h1>
	<p><strong>Modern Nutrition & Meal Delivery Platform</strong></p>
</div>

---

## Table of Contents

- [About Nutrifast](#about-nutrifast)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## About Nutrifast

Nutrifast is a modern web application for nutrition-focused meal delivery. It offers users a seamless experience to browse, filter, and order healthy meals, manage their cart and wishlist, and track their orders. The platform is designed for performance, scalability, and a delightful user experience.

## Features

- 🛒 **Cart & Wishlist**: Add, remove, and auto-load items with persistent state.
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
- **Other**:  Custom Hooks, Modern CSS

## Getting Started
npm run dev

### Installation

```bash
# Clone the repository
$ git clone https://github.com/BelalMuhammed/Nutrifast.git
$ cd Nutrifast

# Install dependencies
$ npm install
# or
$ yarn install
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
│   ├── contexts/          # React Context providers
│   ├── dashboard/         # Admin dashboard components & pages
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   ├── Network/           # Network 
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
- `npm run build` — Build for production
- `npm run lint` — Run ESLint

## Contributing

Contributions are welcome! Please follow these steps:

1. clone the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
