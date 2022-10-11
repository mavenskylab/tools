/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./layouts/**/*.{js,ts,jsx,tsx}",
        "./buttons/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            transitionProperty: {
                'height': 'height',
                'max-height': 'max-height',
                'width': 'width',
                'max-width': 'max-width',
                'size': 'width, height, padding',
                'spacing': 'margin, padding',
                'transform': 'transform, translate, rotate',
            },
            colors: {
                'slate': '#131722',
                'slate-100': '#1f232e',
                'slate-200': '#2b2f3b',
                'slate-300': '#383b48',
                'slate-400': '#454956',
                'slate-500': '#525664',
                'slate-600': '#606472',
                'slate-700': '#6f7281',
                'slate-800': '#7d8190',
                'slate-900': '#8c909f',

                'success': 'var(--success)',
                'info': 'var(--info)',
                'warning': 'var(--warning)',
                'danger': 'var(--danger)',
            },
        },
    },
    safelist: [
        { pattern: /(bg|border|text)-slate-.{3}/ },
        { pattern: /(bg|text)-(slate|success|danger)/ },
        { pattern: /text-(info|warning)/ },
    ],
    plugins: [],
}
