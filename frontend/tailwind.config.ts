// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        bgLight: '#f9fafb',
        bgDark: '#111827',
        cardDark: '#1f2937',
        cardLight: '#ffffff',
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '2rem',
      },
      boxShadow: {
        card: '0 10px 15px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
export default config;
