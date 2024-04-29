/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        futura: "Futura XBlk BT",
        gesstwo: "GE SS Two",
        geDinkum:"GE Dinkum",
      },
      colors: {
        navColor: "#1E1E1E",
        logoutBtnColor: "#D84B4B",
        PageNotFoundcolor:"#A0AAB5",
        customGray: 'rgba(239, 239, 239, 1)',
        borderColor:'rgba(41, 41, 41, 0.21)',
        tableColor:'#ECECEC'

      },
    },
  },
  plugins: [],
};
