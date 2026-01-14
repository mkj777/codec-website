# Codec Web

A modern, responsive landing page for Codec built with React, TypeScript, and Vite. Features smooth scroll-triggered animations, component-based architecture, and a polished user experience.

## Features

- **Hero Section** - Compelling introduction with eye-catching design
- **Showcase** - Interactive product showcase section
- **Features** - Detailed features overview highlighting key capabilities
- **Download Section** - Call-to-action for user engagement
- **Scroll Animations** - Smooth, performance-optimized animations triggered on scroll using Intersection Observer API
- **Responsive Design** - Mobile-first approach with responsive layout
- **Component-Based** - Modular, reusable component architecture
- **Type-Safe** - Full TypeScript support for better development experience
- **Icon System** - Custom icon components for visual consistency

## Tech Stack

- **React** 19.2.0 - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next generation frontend build tool
- **CSS Modules** - Scoped styling for components
- **ESLint** - Code quality and consistency
- **pnpm** - Fast, efficient package manager

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/codec-web.git
cd codec-web
```

2. Install dependencies:
```bash
pnpm install
```

### Development

Start the development server with hot module replacement:

```bash
pnpm run dev
```

The app will be available at `http://localhost:5173`

### Building

Build for production:

```bash
pnpm run build
```

### Preview

Preview the production build locally:

```bash
pnpm run preview
```

### Linting

Run ESLint to check code quality:

```bash
pnpm run lint
```

## Project Structure

```
src/
├── components/
│   ├── Hero/              # Hero section component
│   ├── Showcase/          # Product showcase component
│   ├── Features/          # Features overview component
│   ├── Download/          # Download section component
│   ├── Footer/            # Footer component
│   ├── Icons/             # Icon components
│   └── Header/            # Header component
├── types/                 # TypeScript type definitions
├── assets/                # Static assets and images
├── App.tsx                # Main App component
├── App.css                # Global styles
└── main.tsx               # Application entry point
```

## Component Features

### Scroll Animations
Components support scroll-triggered animations using Intersection Observer API:
- `.animate-on-scroll` - Animate element when it enters viewport
- `.animate-children` - Animate child elements on scroll
- Configurable threshold and root margin for fine-tuned animation triggers

### Styling
All components use CSS Modules for:
- Scoped styling to prevent conflicts
- Better maintainability
- Component-specific theme customization

## License

MIT License - feel free to use this project for personal and commercial purposes.
