import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'green-dark': '#015F43',
        'green-default': '#00875F',
        'green-light': '#00B37E',
        'red-dark': '#AA2834',
        'red-default': '#F75A68',
        'gray-personalized': {
          gray1: '#121214',
          gray2: '#202024',
          gray3: '#29292E',
          gray4: '#323238',
          gray5: '#7C7C8A',
          gray6: '#C4C4CC',
          gray7: '#E1E1E6',
          white: '#FFFFFF',
        },
      },
    },
  },
  plugins: [
    function ({
      addUtilities,
    }: {
      addUtilities: (utilities: Record<string, Record<string, string>>) => void
    }) {
      const newUtilities = {
        '.flex-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }

      addUtilities(newUtilities)
    },
  ],
}
export default config
