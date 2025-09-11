# Community Marketplace.

Welcome to the Community Marketplace project! This application serves as a platform where users can list products, browse listings, and manage their own product inventory. It's designed to facilitate community-driven commerce in a user-friendly environment.

📱 Tech Stack
Frontend (Mobile App)

React Native: A popular framework for building cross-platform mobile applications using JavaScript and React.

Expo: A set of tools and services built around React Native to help you start an app, run it on a device, and share it with others.

Redux: A predictable state container for JavaScript apps, used here for managing the app's state.

React Navigation: Routing and navigation for your React Native apps.

Axios: Promise-based HTTP client for the browser and Node.js, used for making API requests.

## Backend (API)

Node.js: JavaScript runtime built on Chrome's V8 JavaScript engine.

Express.js: Fast, unopinionated, minimalist web framework for Node.js.

MongoDB: NoSQL database for storing user and product data.

Mongoose: MongoDB object modeling for Node.js, providing a straight-forward, schema-based solution to model your application data.

JWT (JSON Web Tokens): Compact, URL-safe means of representing claims to be transferred between two parties, used for authentication.

Development Tools

Git: Version control system to track changes in source code during software development.

GitHub: Platform for version control and collaboration, allowing multiple people to work on projects at once.

Postman: API testing tool that helps in developing APIs by sending requests to your server and viewing responses.

ESLint: A static code analysis tool for identifying problematic patterns found in JavaScript code.

## 🚀 Features

User Authentication: Secure login and registration using JWT.

Product Listings: Users can add, edit, and delete their product listings.

Search and Filters: Advanced search functionality with filters to find products easily.

Product Details: Detailed view of each product with images, descriptions, and pricing.

Cart/Wishlist: Ability to add products to a cart or wishlist for future purchase.

Responsive Design: Optimized for both iOS and Android platforms.

🛠️ Setup Instructions
Prerequisites

Node.js (v14 or higher)

MongoDB (local or cloud instance)

Expo CLI

Backend Setup

Clone the repository:

git clone https://github.com/kalviumcommunity/Community-marketplace.git
cd Community-marketplace/backend


Install dependencies:

npm install


Configure environment variables:

Create a .env file in the root directory.

Add your MongoDB URI and JWT secret key:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret


Start the server:

npm start

Frontend Setup

Navigate to the frontend directory:

cd ../frontend


Install dependencies:

npm install


Start the Expo project:

expo start


Scan the QR code with the Expo Go app on your mobile device to run the application.

🤝 Contribution Guidelines

We welcome contributions to enhance the functionality and performance of the Community Marketplace. Please follow these steps to contribute:

Fork the repository.

Create a new branch (git checkout -b feature-name).

Make your changes and commit them (git commit -am 'Add new feature').

Push to the branch (git push origin feature-name).

Create a new Pull Request.


## Team Members

- Premapriya(Team Leader)
- Ranjan
- Aditya Kannur
- Akhil
