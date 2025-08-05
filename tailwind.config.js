/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/flowbite/**/*.js", // ✅ Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [
     require('flowbite/plugin') // ✅ Include Flowbite plugin
  ],
}

