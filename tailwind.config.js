/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      container: {
        center: true,
      },
      colors: {
        base: 'hsl(var(--b1) / <alpha-value>)',
      },
    },
  },
  daisyui: {
    themes: [
      {
        custom: {
          primary: '#f5c583',
          'primary-content': '#1b1b1b',
          'base-100': '#171820',
          'base-200': '#282B32',
          'base-300': '#292B3F',
          'base-content': '#ffffff',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
