module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				blue: {
					darkest: '#336699',
					dark: '#4785C2',
					DEFAULT: '#94B8DB',
					light: '#C1D6EB',
					lightest: '#E0EBF5'
				},
				background: {
					DEFAULT: '#FAFBFC'
				}
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
