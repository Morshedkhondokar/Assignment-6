/** @type {import('tailwindcss').Config} */
export const content = [
    "./index.html",
    "./src/**/*.{html,js}", // adjust this to match your project structure
];
export const theme = {
    extend: {
        fontFamily: {
            lato: ['Lato', 'sans-serif'],
        },
        colors: {
            primary: '#1e40af', // Custom primary color (blue-800)
            secondary: '#f59e0b', // Custom secondary color (amber-500)
        },
    },
};
export const darkMode = 'class';
export const plugins = [];
