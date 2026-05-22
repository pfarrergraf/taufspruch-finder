/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        baby: {
          rose:     { 50:'#fff1f3', 100:'#ffe4e8', 200:'#ffc8d0', 300:'#ff9aaa', 400:'#ff6b82', 500:'#f43f5e' },
          sky:      { 50:'#f0f9ff', 100:'#e0f2fe', 200:'#b9e7fe', 300:'#7dcffd', 400:'#3bb3f8', 500:'#0ea5e9' },
          mint:     { 50:'#f0fdf9', 100:'#ccfbef', 200:'#99f6e0', 300:'#5eead4', 400:'#2dd4bf', 500:'#14b8a6' },
          lavender: { 50:'#faf5ff', 100:'#f3e8ff', 200:'#e9d5ff', 300:'#d8b4fe', 400:'#c084fc', 500:'#a855f7' },
          cream:    { 50:'#fffbf0', 100:'#fff4d6', 200:'#ffe9a8', 300:'#ffd97a' },
          gold:     { 400:'#f59e0b', 500:'#d97706' },
        },
      },
      fontFamily: {
        sans:  ['Nunito', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 2px 20px rgba(0,0,0,0.06)',
        card: '0 4px 24px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
