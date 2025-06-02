# Portugalenses Portal

A comprehensive portal for transportation company management built with Next.js 14 and TypeScript.

## Features

- **Modern Tech Stack**: Built with Next.js 14, TypeScript, and React
- **App Router**: Uses the latest Next.js App Router architecture
- **Responsive Design**: Fully responsive for all device sizes
- **Internationalization**: Support for English, Portuguese, and Italian
- **Authentication**: Complete authentication flow with protected routes
- **Glassmorphism UI**: Modern UI with glassmorphism effects

## Sections

- **Clients**: Manage PHC clients, contacts, and approval requests
- **Documents**: Access service orders, document management, and checking account
- **Transports**: Submit and monitor transport requests
- **Logistics**: Manage logistics operations (placeholder for future implementation)
- **Customer Support**: Submit and track contact requests and complaints
- **Certifications**: Upload and manage certification files
- **Settings**: Configure profile, appearance, and notification settings

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Extract the zip file to your desired location
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

- `/src/app`: Pages and routes using Next.js App Router
- `/src/components`: Reusable UI components
- `/src/layouts`: Layout components
- `/src/lib`: Utility functions and context providers
- `/src/styles`: Global styles and CSS variables

## Styling

The project uses CSS Modules for component-specific styling and global CSS variables for consistent theming. The primary color scheme is based on rgb(13, 23, 79).

## Authentication

For demo purposes, the authentication system simulates a successful login without actual backend validation. In a production environment, this would be connected to a real authentication service.
