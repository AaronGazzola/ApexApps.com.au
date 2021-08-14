interface SVGProps {
	name: string;
	className?: string;
}

interface Icon {
	props: {
		xmlns?: string;
		viewBox: string;
		width?: string;
		height?: string;
		preserveAspectRatio?: 'xMinYMin';
	};
	path: React.ReactNode;
}
interface Icons {
	[name: string]: Icon;
}

const icons: Icons = {
	lock: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-5 -2 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M2 12v6h10v-6H2zm10-2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2V5a5 5 0 1 1 10 0v5zm-2 0V5a3 3 0 1 0-6 0v5h6zm-3 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z'></path>
		)
	},
	key: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-1 -1 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M8.612 16.337l3.746-3.747 1.027.183a5 5 0 1 0-4.039-4.039l.184 1.028-6.994 6.994.177 2.651 2.651.177 1.833-1.833-.707-.707a1 1 0 0 1 1.415-1.414l.707.707zm.707-13.435a7 7 0 1 1 3.715 11.84L6.137 21.64l-4.43-.295a1 1 0 0 1-.932-.932l-.295-4.43 6.898-6.898a6.992 6.992 0 0 1 1.94-6.183zm4.242 5.656A2 2 0 1 1 16.39 5.73a2 2 0 0 1-2.829 2.828z'></path>
		)
	},
	arrow: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-5 -5 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M10.586 5.657l-3.95-3.95A1 1 0 0 1 8.05.293l5.657 5.657a.997.997 0 0 1 0 1.414L8.05 13.021a1 1 0 1 1-1.414-1.414l3.95-3.95H1a1 1 0 1 1 0-2h9.586z'></path>
		)
	},
	clipboard: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-5 -2 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M5 2v2h4V2H5zm6 0h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2zm0 2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2H2v14h10V4h-1zM4 8h6a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 5h6a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'></path>
		)
	},
	card: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-2 -5 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M2 0h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v10h16V2H2zm9 2h5a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2zm0 3h5a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2zM4 4h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z'></path>
		)
	},
	checklist: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-2 -2 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M6 0h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6zm0 2a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4H6zm6 7h3a1 1 0 0 1 0 2h-3a1 1 0 0 1 0-2zm-2 4h5a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2zm0-8h5a1 1 0 0 1 0 2h-5a1 1 0 1 1 0-2zm-4.172 5.243L7.95 8.12a1 1 0 1 1 1.414 1.415l-2.828 2.828a1 1 0 0 1-1.415 0L3.707 10.95a1 1 0 0 1 1.414-1.414l.707.707z'></path>
		)
	},
	watch: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-4 -1 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M9 10h2a1 1 0 0 1 0 2H8a1 1 0 0 1-1-1V7a1 1 0 1 1 2 0v3zM4 4.07V3a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1.07A7.997 7.997 0 0 1 16 11a7.997 7.997 0 0 1-4 6.93V19a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-1.07A7.997 7.997 0 0 1 0 11a7.997 7.997 0 0 1 4-6.93zm2-.818A8.014 8.014 0 0 1 8 3c.69 0 1.36.088 2 .252V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v.252zm0 15.496V19a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.252a8.047 8.047 0 0 1-4 0zM8 17A6 6 0 1 0 8 5a6 6 0 0 0 0 12z'></path>
		)
	},
	chevronLeft: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '0 -1 8 16',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M2.757 7l4.95 4.95a1 1 0 1 1-1.414 1.414L.636 7.707a1 1 0 0 1 0-1.414L6.293.636A1 1 0 0 1 7.707 2.05L2.757 7z'></path>
		)
	},
	chevronRight: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '0 -1 8 16',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M5.314 7.071l-4.95-4.95A1 1 0 0 1 1.778.707l5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-1.414-1.414l4.95-4.95z'></path>
		)
	},
	userSquare: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-2 -2 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M4 0h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm1.229 16H4a2 2 0 0 1-.813-.172 5.58 5.58 0 0 1 3.347-3.758 1 1 0 1 1 .733 1.86A3.579 3.579 0 0 0 5.229 18zm9.512 0a3.658 3.658 0 0 0-2.097-2.066 1 1 0 1 1 .712-1.868 5.659 5.659 0 0 1 3.437 3.77A1.993 1.993 0 0 1 16 18h-1.26zM10 4a4 4 0 0 1 4 4v2a4 4 0 1 1-8 0V8a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v2a2 2 0 1 0 4 0V8a2 2 0 0 0-2-2z'></path>
		)
	},
	userCircle: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-2 -2 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-14a4 4 0 0 1 4 4v2a4 4 0 1 1-8 0V8a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v2a2 2 0 1 0 4 0V8a2 2 0 0 0-2-2zM5.91 16.876a8.033 8.033 0 0 1-1.58-1.232 5.57 5.57 0 0 1 2.204-1.574 1 1 0 1 1 .733 1.86c-.532.21-.993.538-1.358.946zm8.144.022a3.652 3.652 0 0 0-1.41-.964 1 1 0 1 1 .712-1.868 5.65 5.65 0 0 1 2.284 1.607 8.032 8.032 0 0 1-1.586 1.225z'></path>
		)
	}
};

const SVG = (props: SVGProps) => {
	const { name = 'lock', className = '' } = props;

	const iconName = name in icons ? name : 'lock';

	return (
		<svg {...icons[iconName].props} className={className}>
			{icons[iconName].path}
		</svg>
	);
};

export default SVG;
