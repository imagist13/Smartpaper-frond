/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            maxWidth: '100%',
            a: {
              color: theme('colors.indigo.600'),
              '&:hover': {
                color: theme('colors.indigo.700'),
              },
            },
            h1: {
              fontSize: theme('fontSize.2xl'),
              fontWeight: theme('fontWeight.bold'),
              marginBottom: theme('spacing.6'),
              marginTop: theme('spacing.8'),
              lineHeight: theme('lineHeight.tight'),
              color: theme('colors.gray.900'),
            },
            h2: {
              fontSize: theme('fontSize.xl'),
              fontWeight: theme('fontWeight.semibold'),
              marginBottom: theme('spacing.4'),
              marginTop: theme('spacing.6'),
              lineHeight: theme('lineHeight.tight'),
              color: theme('colors.gray.900'),
            },
            h3: {
              fontSize: theme('fontSize.lg'),
              fontWeight: theme('fontWeight.semibold'),
              marginBottom: theme('spacing.3'),
              marginTop: theme('spacing.5'),
              lineHeight: theme('lineHeight.tight'),
              color: theme('colors.gray.900'),
            },
            pre: {
              backgroundColor: theme('colors.gray.100'),
              borderRadius: theme('borderRadius.md'),
              padding: theme('spacing.4'),
              fontSize: theme('fontSize.sm'),
            },
            code: {
              backgroundColor: theme('colors.indigo.50'),
              padding: `${theme('spacing.1')} ${theme('spacing.1')}`,
              borderRadius: theme('borderRadius.sm'),
              fontSize: '0.9em',
              color: theme('colors.indigo.700'),
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            'ul > li': {
              position: 'relative',
              paddingLeft: theme('spacing.6'),
            },
            'ol > li': {
              position: 'relative',
              paddingLeft: theme('spacing.6'),
            },
            blockquote: {
              fontWeight: theme('fontWeight.normal'),
              fontStyle: 'normal',
              borderLeftWidth: '0.25rem',
              borderLeftColor: theme('colors.indigo.200'),
              backgroundColor: theme('colors.indigo.50'),
              padding: theme('spacing.4'),
              color: theme('colors.gray.700'),
            },
            table: {
              fontSize: theme('fontSize.sm'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
