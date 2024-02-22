/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./src/index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "main-bg": "url('assets/images/bg.png')",
        "footer-texture": "url('/img/footer-texture.png')",
      },
      linearGradientColors: {
        custom: "355.95deg, #0b8564 1.99%, #002e7c 98.36%",
      },
      screens: {
        mobile: "320px",

        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
      spacing: {
        pad5: "5rem",
      },
      gap: {
        gap5: "20px",
      },
    },
    colors: {
      linkColor: "#bae4ff",
      submitBtnColor: "#01cd74",
      submitBtnHover: "#52b204",
      bgColor: "#181D39",
      gradientFrom: "#0b8564",
      gradientTo: "#002e7c",
      sidebarTextColor: "#d4d4d4",
      textWhite: "#ffffff",
    },
  },
  plugins: [require("tailwindcss-gradients")],
};
