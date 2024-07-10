import daisyui from "daisyui"
module.exports = {
  //...
  plugins: [
    daisyui,
  ],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: []
};