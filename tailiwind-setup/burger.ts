import type { Config } from "tailwindcss";

const burger: Config = {
  content: [],
  theme: {
    extend: {
      keyframes: {
        burgerTopLine: {
          // 32px = height + space between lines = 8px + 24px
          "0%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(0, 32px, 0)" },
          "100%": { transform: "translate3d(0, 32px, 0) rotate(45deg)" },
        },
        burgerBottomLine: {
          "0%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(0, -32px, 0)" },
          "100%": { transform: "translate3d(0, -32px, 0) rotate(135deg)" },
        },
        burgerTopLineRev: {
          "0%": { transform: "translate3d(0, 32px, 0) rotate(45deg)" },
          "50%": { transform: "translate3d(0, 32px, 0) rotate(0)" },
          "100%": { transform: "translate3d(0, 0, 0)" },
        },
        burgerBottomLineRev: {
          "0%": { transform: "translate3d(0, -32px, 0) rotate(135deg)" },
          "50%": { transform: "translate3d(0, -32px, 0) rotate(0)" },
          "100%": { transform: "translate3d(0, 0, 0)" },
        },
      },
      animation: {
        burgerTop: "burgerTopLine 0.7s forwards",
        burgerBottom: "burgerBottomLine 0.7s forwards",
        burgerTopRev: "burgerTopLineRev 0.7s ease-in-out",
        burgerBottomRev: "burgerBottomLineRev 0.7s ease-in-out",
      },
    },
  },
};

export default burger;
