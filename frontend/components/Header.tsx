import Logo from './Logo';
import HeaderLink from './HeaderLink';
import { useAppSelector } from '../redux/hooks';
import Link from 'next/link';
import SVG from './SVG';
import { useRouter } from 'next/router';

interface HeaderProps {
	headerHeight: number;
	tourBannerHeight: number;
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
	const router = useRouter();
	const { onTour } = useAppSelector(state => state.users);
	const { headerHeight, tourBannerHeight } = props;
	return (
		<>
			<header className='absolute top-0 left-0 w-full bg-blue-lightest flex justify-center select-none z-30'>
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
			{onTour && (
				<Link href='/contact' passHref>
					<div
						className='absolute left-0 w-full bg-yellow-100 flex justify-center items-center pl-9 cursor-pointer'
						style={{ top: headerHeight, height: tourBannerHeight }}
						onClick={() => {
							router.push('/contact');
						}}
					>
						<p className='text-center font-semibold text-sm italic text-yellow'>
							<SVG name='key' classes='inline-block fill-current w-4 h-4' />
							<span className='px-2 mb-1'>Welcome to tour mode</span>
							<SVG name='key' classes='inline-block fill-current w-4 h-4' />
							<br />
							Click here to request full access
						</p>
					</div>
				</Link>
			)}
		</>
	);
};

export default Header;
