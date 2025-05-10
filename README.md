# Giphiosta - A GIPHY Browsing Application

Giphiosta is a modern web application for browsing, searching, and saving your favorite GIFs from GIPHY. Built with React, TypeScript, and Vite, it offers a responsive and intuitive interface for all your GIF needs.

Live : https://giphiosta.vercel.app

## Features

- Browse trending GIFs and stickers
- Search for GIFs by keywords
- View GIFs by categories
- Save your favorite GIFs
- View detailed information about each GIF
- Responsive design for mobile and desktop

## Tech Stack

- **React 19** - Latest version of the popular UI library
- **TypeScript** - For type safety and better developer experience
- **Vite** - Fast, modern frontend build tool
- **React Router** - For navigation and routing
- **Tailwind CSS** - For styling and responsive design
- **GIPHY API** - For fetching GIFs and related data

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/atulkumar-20/giphiosta.git
   cd giphiosta
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root directory and add your GIPHY API key:
   ```
   VITE_GIPHY_API_KEY=your_giphy_api_key
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```bash
pnpm build
```

To preview the production build locally:

```bash
pnpm preview
```

## Project Structure

```
giphiosta/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers
│   ├── layouts/        # Layout components
│   ├── pages/          # Page components
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── .env                # Environment variables (not in repo)
├── index.html          # HTML entry point
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [GIPHY](https://giphy.com/) for providing the API
- [React Icons](https://react-icons.github.io/react-icons/) for the icon set
- All the open-source libraries that made this project possible
