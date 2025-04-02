/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}", // Include files in the app/ directory (for App Router)
      "./src/**/*.{js,ts,jsx,tsx}", // Include files in the src/ directory (for components, utils, etc.)
    ],
    theme: {
      extend: {}, // You can add custom theme extensions here (e.g., colors, fonts)
    },
    plugins: [], // Add Tailwind plugins here if needed
  };