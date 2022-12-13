/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				mono: ['"Roboto Mono"', 'monospace'],
			},
			boxShadow: {
				brutal: '10px 10px 0px 0px rgba(0,0,0,0.3)',
				'brutal-closer': '6px 6px 0px 0px rgba(0,0,0,0.3)',
			},
			colors: {
				toucan: {
					50: '#ffd7cc',
					100: '#fbc4b5',
					200: '#f7b29f',
					300: '#f39f88',
					400: '#ef8c71',
					500: '#eb7a5b',
					600: '#e76744',
					700: '#e3542d',
					800: '#df4217',
					900: '#db2f00',
				},
				'cobalt-blue': {
					50: '#bbdffb',
					100: '#a7cef1',
					200: '#93bde7',
					300: '#7facdd',
					400: '#6b9bd3',
					500: '#578bc9',
					600: '#437abf',
					700: '#2f69b5',
					800: '#1b58ab',
					900: '#0747a1',
				},
			},
		},
	},
	plugins: [],
};
