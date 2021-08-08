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
				},
				green: {
					DEFAULT: '#41992B'
				},
				gray: {
					dark: '#474545',
					DEFAULT: '#7A7A7A',
					light: '#C1C1C1'
				},
				yellow: {
					dark: '#995C00',
					DEFAULT: '#992820'
				},
				red: {
					DEFAULT: '#992820'
				}
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
