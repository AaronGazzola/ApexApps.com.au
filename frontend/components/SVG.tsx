import CSS from 'csstype';

interface SVGProps {
	name: string;
	classes?: string;
	style?: CSS.Properties;
	onClick?: React.MouseEventHandler;
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
	doubleArrow: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-2 -2 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M1 0h6a1 1 0 1 1 0 2H3.414L18 16.586V13a1 1 0 0 1 2 0v6a1 1 0 0 1-1 1h-6a1 1 0 0 1 0-2h3.586L2 3.414V7a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1z'></path>
		)
	},
	medical: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-2 -2 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M7 12.917v.583a4.5 4.5 0 1 0 9 0v-1.67a3.001 3.001 0 1 1 2 0v1.67a6.5 6.5 0 1 1-13 0v-.583A6.002 6.002 0 0 1 0 7V2a2 2 0 0 1 2-2h1a1 1 0 1 1 0 2H2v5a4 4 0 1 0 8 0V2H9a1 1 0 1 1 0-2h1a2 2 0 0 1 2 2v5a6.002 6.002 0 0 1-5 5.917zM17 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'></path>
		)
	},
	deleteUser: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-2 -2 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M3.534 10.07a1 1 0 1 1 .733 1.86A3.579 3.579 0 0 0 2 15.26V17a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1.647a3.658 3.658 0 0 0-2.356-3.419 1 1 0 1 1 .712-1.868A5.658 5.658 0 0 1 14 15.353V17a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3v-1.74a5.579 5.579 0 0 1 3.534-5.19zM7 0a4 4 0 0 1 4 4v2a4 4 0 1 1-8 0V4a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v2a2 2 0 1 0 4 0V4a2 2 0 0 0-2-2zm10.414 4l1.414 1.414a1 1 0 0 1-1.414 1.414L16 7.414l-1.414 1.414a1 1 0 1 1-1.414-1.414L14.586 6l-1.414-1.414a1 1 0 0 1 1.414-1.414L16 4.586l1.414-1.414a1 1 0 1 1 1.414 1.414L17.414 6z'></path>
		)
	},
	door: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-6 -2 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M2 0h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v16h8V2H2zm2 7h1a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2z'></path>
		)
	},
	pencil: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-2.5 -2.5 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M12.238 5.472L3.2 14.51l-.591 2.016 1.975-.571 9.068-9.068-1.414-1.415zM13.78 3.93l1.414 1.414 1.318-1.318a.5.5 0 0 0 0-.707l-.708-.707a.5.5 0 0 0-.707 0L13.781 3.93zm3.439-2.732l.707.707a2.5 2.5 0 0 1 0 3.535L5.634 17.733l-4.22 1.22a1 1 0 0 1-1.237-1.241l1.248-4.255 12.26-12.26a2.5 2.5 0 0 1 3.535 0z'></path>
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
	checkMark: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-5 -7 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M5.486 9.73a.997.997 0 0 1-.707-.292L.537 5.195A1 1 0 1 1 1.95 3.78l3.535 3.535L11.85.952a1 1 0 0 1 1.415 1.414L6.193 9.438a.997.997 0 0 1-.707.292z'></path>
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
	},
	close: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-6 -6 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z'></path>
		)
	},
	add: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-4.5 -4.5 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M8.9 6.9v-5a1 1 0 1 0-2 0v5h-5a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5z'></path>
		)
	},
	eyeClosed: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-2 -2 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M15.398 7.23l1.472-1.472C18.749 6.842 20 8.34 20 10c0 3.314-4.958 5.993-10 6a14.734 14.734 0 0 1-3.053-.32l1.747-1.746c.426.044.862.067 1.303.066h.002c-.415 0-.815-.063-1.191-.18l1.981-1.982c.47-.202.847-.579 1.05-1.049l1.98-1.981A4 4 0 0 1 10.022 14C14.267 13.985 18 11.816 18 10c0-.943-1.022-1.986-2.602-2.77zm-9.302 3.645A4 4 0 0 1 9.993 6C5.775 5.985 2 8.178 2 10c0 .896.904 1.877 2.327 2.644L2.869 14.1C1.134 13.028 0 11.585 0 10c0-3.314 4.984-6.017 10-6 .914.003 1.827.094 2.709.262l-1.777 1.776c-.29-.022-.584-.035-.88-.038.282.004.557.037.823.096l-4.78 4.779zM19.092.707a1 1 0 0 1 0 1.414l-16.97 16.97a1 1 0 1 1-1.415-1.413L17.677.708a1 1 0 0 1 1.415 0z'></path>
		)
	},
	eyeOpen: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-2 -6 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M18 6c0-1.81-3.76-3.985-8.007-4C5.775 1.985 2 4.178 2 6c0 1.825 3.754 4.006 7.997 4C14.252 9.994 18 7.82 18 6zm-8 6c-5.042.007-10-2.686-10-6S4.984-.017 10 0c5.016.017 10 2.686 10 6s-4.958 5.993-10 6zm0-2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'></path>
		)
	},
	compass: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-2 -2 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M11.932 9.482a2.003 2.003 0 0 1-2.45 2.45L6.464 14.95a1 1 0 1 1-1.414-1.414l3.018-3.018a2.003 2.003 0 0 1 2.45-2.45l3.018-3.018a1 1 0 0 1 1.414 1.414l-3.018 3.018zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z'></path>
		)
	},
	lightBulb: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-5 -2 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M9 14v-2.298l.856-.597a5 5 0 1 0-5.712 0l.856.597V14h1V6a1 1 0 1 1 2 0v8h1zm0 2H5v2h4v-2zM0 7a7 7 0 1 1 11 5.745V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5.255A6.992 6.992 0 0 1 0 7z'></path>
		)
	},
	lightBulbFill: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-5 -1.5 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M11 14.565H8v-8a1 1 0 1 0-2 0v8H3V13.31a7 7 0 1 1 8 0v1.255zm0 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2h8z'></path>
		)
	},
	pulse: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-2 -3 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M7.116 10.749L6 1.948l-1.116 8.8H1c-.552 0-1-.437-1-.976a.99.99 0 0 1 1-.978h2.116l.9-7.086C4.15.636 5.15-.124 6.245.008c.91.11 1.626.81 1.739 1.7l.899 7.086h1.974L12 16.04l1.142-7.245H19c.552 0 1 .438 1 .978s-.448.977-1 .977h-4.142l-.881 5.587a1.978 1.978 0 0 1-1.672 1.634c-1.092.165-2.113-.567-2.282-1.634l-.88-5.587H7.115z'></path>
		)
	},
	map: {
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-2 -2 24 24',
			width: '24',
			height: '24',
			preserveAspectRatio: 'xMinYMin'
		},
		path: (
			<path d='M2 17.613l3.419-1.14A5 5 0 0 1 6 16.317V2.387L2 3.721v13.892zm-.662 2.328A1 1 0 0 1 0 19V3a1 1 0 0 1 .706-.956L5.419.473a5 5 0 0 1 3.162 0l3.47 1.157a3 3 0 0 0 1.898 0L18.662.059A1 1 0 0 1 20 1v16a1 1 0 0 1-.706.956l-4.713 1.571a5 5 0 0 1-3.162 0l-3.47-1.157a3 3 0 0 0-1.898 0l-4.713 1.571zM18 16.28V2.387l-3.419 1.14a5 5 0 0 1-.581.156v13.93l4-1.334zm-6 1.334V3.683a5 5 0 0 1-.581-.156L8 2.387v13.93a5 5 0 0 1 .581.156L12 17.613z'></path>
		)
	}
};

const SVG = (props: SVGProps) => {
	const { name = 'lock', classes = '', style = {}, onClick = () => {} } = props;

	const iconName = name in icons ? name : 'lock';

	return (
		<svg
			{...icons[iconName].props}
			className={classes}
			style={style}
			onClick={onClick}
		>
			{icons[iconName].path}
		</svg>
	);
};

export default SVG;
