/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7f4',
          100: '#dcede6',
          200: '#bcd9cd',
          300: '#8ebfac',
          400: '#5c9e87',
          500: '#3b826b',
          600: '#2d6a4f',
          700: '#245541',
          800: '#1e4435',
          900: '#19382c',
        },
        parchment: {
          50: '#fdf9f0',
          100: '#faf0dc',
          200: '#f3ddb5',
          300: '#e9c47e',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
