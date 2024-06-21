/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        lightning: {
          '0%, 100%': { boxShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #0d6efd, 0 0 30px #0d6efd, 0 0 40px #0d6efd, 0 0 50px #0d6efd' },
          '50%': { boxShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #0d6efd, 0 0 25px #0d6efd, 0 0 35px #0d6efd, 0 0 45px #0d6efd' },
        },
      },
      animation: {
        lightning: 'lightning 1s infinite',
      },
    },
  },
  plugins: [],
}

