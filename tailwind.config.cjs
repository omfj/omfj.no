/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        bg: "#181818",
        fg: "#eee",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
