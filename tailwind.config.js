/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {      
      YsabeauInfant : ['Ysabeau Infant', "sans-serif"],
      YsabeauOffice : ['Ysabeau Office', "sans-serif"],
      EduSA : ['Edu SA Beginner'],
      Lilita : ['Lilita One'],
      Lugrasimo : ['Lugrasimo', 'cursive']
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      '2xl': '1536px'
    },
    extend: {
      animation: {
        shine: "shine 1s",
      },
      keyframes: {
        shine: {
          "100%": { left: "125%" },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'entanglement' : "url('/img/qe.png')",
        'stringTheory' : "url('/img/a.png')",
        'mindfulness' : "url('/img/mindfulness.jpg')",
        'fibunacci' : "url('/img/fibunacci.png')",
      },
    },
  },
  plugins: [],
}
