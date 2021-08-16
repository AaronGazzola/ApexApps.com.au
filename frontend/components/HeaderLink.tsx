import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppSelector } from '../redux/hooks';
import SVG from './SVG';

interface HeaderLinkProps {
	path: string;
	title: string;
}

const HeaderLink = (props: HeaderLinkProps) => {
	const { title, path } = props;
	const { isAuth } = useAppSelector(state => state.users);
	const router = useRouter();
	// set active
	let pathIsActive = router.pathname === path;
	if (isAuth && path === '/login') {
		switch (router.pathname) {
			case '/project':
			case '/timeline':
			case '/milestones':
			case '/proposal':
				pathIsActive = true;
			default:
				break;
		}
	}

	return (
		<Link href={isAuth && path === '/login' ? '/project' : path}>
			<a
				className={`flex items-center hover:text-blue-darkest ${
					pathIsActive ? `text-blue-darkest` : `text-white`
				}`}
			>
				<div className='w-2 sm:w-3.5'>
					<SVG name='chevronLeft' classes='fill-current w-full' />
				</div>
				{path === '/login' && isAuth ? (
					<div className='w-5 m-1 sm:w-8 text-blue-darkest'>
						<SVG classes='fill-current w-full h-full' name='userCircle' />
					</div>
				) : (
					<p className='font-semibold text-xs mx-0.5 sm:mx-2 sm:text-lg whitespace-nowrap text-blue-darkest'>
						{title}
					</p>
				)}
				<div className='w-2 sm:w-3.5'>
					<SVG classes='fill-current w-full' name='chevronRight' />
				</div>
			</a>
		</Link>
	);
};

export default HeaderLink;
