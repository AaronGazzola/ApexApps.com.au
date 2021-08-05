import Logo from './Logo';
import HeaderLink from './HeaderLink';

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

const Header = () => {
	return (
		<div className='w-full bg-blue-lightest flex justify-center'>
			<div className='container max-w-sm sm:max-w-3xl flex justify-between items-center overflow-x-auto px-2 sm:px-10'>
				<Logo />
				{navItems.map(item => (
					<HeaderLink path={item.path} key={item.path} title={item.title} />
				))}
			</div>
		</div>
	);
};

export default Header;
