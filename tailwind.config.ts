import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        "heading-md": "32px"
      },
      colors: {
        "custom-purple": "#633CFF",
        "custom-purple-lighter": "#BEADFF",
        "custom-purple-light": "#EFEBFF",
        "custom-black": "#333333",
        "custom-gray": "#737373",
        "custom-gray-lighter": "#D9D9D9",
        "custom-gray-light": "#FAFAFA",
        "custom-red": "#FF3939",
      }
    },
  },
  plugins: [],
}
export default config
