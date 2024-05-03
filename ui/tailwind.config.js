/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./registry/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  daisyui: {
    themes: ["light", "dark", "cupcake", "synthwave", "retro", "cyberpunk"],
  },
  plugins: [require("daisyui"),require('@tailwindcss/typography')],

  theme: {
    extend: {
      spacing: {
        '84': '22rem',
      }
    }
  }
};
