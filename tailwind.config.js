/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'slate-dark': '#0f172a',
        'slate-darker': '#020617',
        'slate-card': '#1e293b',
      },
    },
  },
  plugins: [],
}
