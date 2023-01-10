/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      boxShadow: {
        'polvillo': ' 0 0 5px 0 #d6d6d6f2;',
      },
      fontFamily: {
        'bitter': 'Bitter, serif',
        'antonio': 'Antonio, sans-serif',
      },
    },
    screens: {
      'xs': '480px',

      'sm': '730px',
      // => @media (min-width: 640px) { ... }

      'md': '900px',
      // => @media (min-width: 768px) { ... }

      'lg': '1140px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1355px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1570px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
};
