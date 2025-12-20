/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // Blue
          dark: '#1e40af',
        },
        secondary: {
          DEFAULT: '#10b981', // Green
          dark: '#059669',
        },
      },
    },
  },
  plugins: [],
}
