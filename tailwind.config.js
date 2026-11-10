/** @type {import('tailwindcss').Config} */
module.exports = {
  // Content paths — Tailwind scans these for class names to include
  content: [
    './index.html',
    './js/**/*.js',
  ],

  corePlugins: {
    // Disable preflight so it doesn't conflict with Bootstrap's reboot
    preflight: false,
  },

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#2dd4bf',
          dark: '#0f766e',
        },
      },
    },
  },

  plugins: [],
};
