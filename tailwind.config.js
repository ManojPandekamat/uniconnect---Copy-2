/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",'./public/index.html'
  ],
  theme: {
    extend: {
      animation: {
        "ping-like":"ping-like 0.8s ease-in-out",
        "slidedown":"slidedown ease-in-out 1.5s",
        "slidedownX":"slidedownX ease-in-out 1.5s",
        "slidedownY":"slidedownY ease-in-out 1.5s",
      } ,
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'], // Add as many as needed
      },
      keyframes:{
        "ping-like":{
          "0%":{
            transform:"scale(1)"
          },
          "50%":{
            transform:"scale(1.2)"
          },
          "100%":{
            transform:"scale(1)"
          }
        },
        slidedown: {
          '0%': { transform: 'translateX(-10%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slidedownX: {
          '0%': { transform: 'translateX(10%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slidedownY: {
          '0%': { transform: 'translateY(20%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      screens:{
        sm:'438px'
      }
    },
  },
  plugins: [],
}

