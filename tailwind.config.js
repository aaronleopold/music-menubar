const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        blackish: '#1b1c20',
        'dark-primary': '#2d3037',
        'dark-accent': '#27292f',
      },
      screens: {
        // light: { raw: '(prefers-color-scheme: light)' },
        // dark: { raw: '(prefers-color-scheme: dark)' },
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/ui'),

    // function ({ addBase, config }) {
    //   addBase({
    //     body: {
    //       color: config('theme.colors.black'),
    //       backgroundColor: config('theme.colors.white'),
    //     },
    //     '@screen dark': {
    //       body: {
    //         color: config('theme.colors.white'),
    //         backgroundColor: config('theme.colors.black'),
    //       },
    //     },
    //   });
    // },
  ],
};
