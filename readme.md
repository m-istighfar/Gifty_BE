# Gifty_BE - Gift Wishlist Web Application Backend

## Live Demonstrations

Discover the Gifty Web Application in action:

- **Netlify**: [Visit Gifty on Netlify](https://giftyy.netlify.app)

## Introduction

Gifty_BE serves as the backbone for the innovative Gifty Web Application, a platform designed to enhance the experience of creating, sharing, and managing gift wishlists. This backend system not only supports seamless interaction between users and their wishlists but also fosters collaboration and decision-making through polls. In this document, you will find comprehensive details on the system's architecture, database design, and functionalities, aimed at equipping developers and stakeholders with a profound understanding of the project.

## System Architecture

At the core of Gifty_BE's backend is a robust framework powered by:

- **Express.js**: A lightweight and flexible Node.js web application framework that provides a rich set of features for web and mobile applications.
- **Prisma ORM**: A next-generation ORM for Node.js and TypeScript, Prisma facilitates easy and reliable database access, schema migration, and complex data modeling.

This backend architecture is designed to efficiently handle HTTP requests, ensuring secure, scalable, and maintainable code.

## Database Design

The Gifty_BE application utilizes a PostgreSQL database, elegantly managed by Prisma ORM to ensure data integrity, facilitate complex queries, and manage relationships. Below is the schema diagram illustrating the database structure:

![Database Schema](/asset/images/GIFTY%20-%20TEAM%203.png)

## Features

- **User Management**: Secure registration, authentication, and user profile management.
- **Wishlist Management**: Intuitive creation, modification, and sharing of wishlists.
- **Item Management**: Detailed item entries with descriptions for wishlists.
- **Collaboration Features**: Easy invitation for others to contribute to or view wishlists.
- **Poll Creation**: Engage with collaborators through polls to make wishlist decisions.

## Getting Started

### Prerequisites

- Node.js (v12 or higher recommended)
- PostgreSQL database

### Setup Instructions

1. **Clone the Repository**: `git clone [repository_url]`.
2. **Project Setup**: Navigate to the `Gifty_BE` directory and install dependencies with `npm install`.
3. **Environment Configuration**: Copy `.env.example` to `.env` and adjust the settings to match your development environment.
4. **Database Migration**: Apply database migrations using `npx prisma migrate dev`.
5. **Development Server**: Launch the backend server with `npm run dev`.

## Usage

With the backend server operational, Gifty_BE will process incoming requests as per the defined route handlers and controllers. We encourage developers to review the API documentation for detailed endpoint descriptions and interaction guidelines.

## API Documentation

Access comprehensive API documentation through our Postman collection:

- [View Postman Collection](https://documenter.getpostman.com/view/28996754/2sA2xh1rtg)