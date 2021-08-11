import Logo from './Logo';
import HeaderLink from './HeaderLink';

interface HeaderProps {
	headerHeight: number;
}

const navItems = [
	{
		title: 'About',
		path: '/'
	},
	{
		title: 'Portfolio',
		path: '/portfolio'
	},
	{
		title: 'Contact',
		path: '/contact'
	},
	{
		title: 'Log in',
		path: '/login'
	}
];

const Header = (props: HeaderProps) => {
	const { headerHeight } = props;
	return (
		<header className='absolute top-0 left-0 w-full bg-blue-lightest flex justify-center select-none z-20'>
			<div
				className='container max-w-sm sm:max-w-3xl flex justify-between items-center overflow-x-auto px-1.5 sm:px-10'
				style={{ height: headerHeight }}
			>
				<Logo variant='header' />
				{navItems.map(item => (
					<HeaderLink path={item.path} key={item.path} title={item.title} />
				))}
			</div>
		</header>
	);
};

export default Header;
