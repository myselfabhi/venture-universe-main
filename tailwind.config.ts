/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}", // Include files in the app/ directory (for App Router)
      "./src/**/*.{js,ts,jsx,tsx}", // Include files in the src/ directory (for components, utils, etc.)
    ],
    theme: {
      extend: {
        colors: {
          'vu-space': '#0c0f1a',
          'vu-cyan': '#00ffff',
          'vu-blue': '#5c3bff',
        },
      }, 
    },
    plugins: [], // Add Tailwind plugins here if needed
  };