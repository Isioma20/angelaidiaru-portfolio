/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A0A14',
        accent: '#7B61FF',
        background: '#F0EFF4',
        dark: '#18181B',
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        drama: ['"Instrument Serif"', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      borderRadius: {
        '2rem': '2rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
    },
  },
  plugins: [],
}
