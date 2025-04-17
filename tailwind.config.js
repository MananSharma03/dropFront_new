/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dropbox-blue': '#0061FF',
        'dropbox-dark-blue': '#0d2f81',
        'dropbox-light-blue': '#4ABFED',
        'dropbox-hover-blue': '#0042B2',
        'dropbox-black': '#1E1919',
        'dropbox-gray': '#637282',
        'dropbox-light-gray': '#F7F5F2',
        'dropbox-red': '#FF5D52',
        'dropbox-yellow': '#FFCC02',
        'dropbox-green': '#A2CD3A',
        'dropbox-orange': '#FF7F32',
        'dropbox-purple': '#C881F2',
        'dropbox-dark-purple': '#6643B5',
        'dropbox-pink': '#E54E9A',
        'dropbox-dark-pink': '#9C366B',
        'dropbox-framework': '#2D3748',
      },
      fontFamily: {
        sans: ['Sharp Sans', 'Arial', 'sans-serif'],
        serif: ['Sharp Serif', 'Georgia', 'serif'],
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem',
        '9xl': '7rem',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '2rem',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      gridTemplateColumns: {
        'brand': 'repeat(auto-fit, minmax(250px, 1fr))',
      },
    },
  },
  plugins: [],
};
