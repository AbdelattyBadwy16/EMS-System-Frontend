/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        '21': '21px',
        '18': '18px',
        '20': '20px',
        '25': '25px',
      },
      fontFamily: {
        futura: "Futura XBlk BT",
        gesstwo: "GE SS Two",
        geDinkum:"GE Dinkum",
      },
      colors: {
        navColor: "#1E1E1E",
        logoutBtnColor: "#D84B4B",
        PageNotFoundcolor:"#A0AAB5"
      },
    },
  },
  plugins: [],
};
