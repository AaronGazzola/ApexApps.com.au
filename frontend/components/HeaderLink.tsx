import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppSelector } from '../redux/hooks';

interface HeaderLinkProps {
	path: string;
	title: string;
}

const HeaderLink = (props: HeaderLinkProps) => {
	const { title, path } = props;
	const { isAuth } = useAppSelector(state => state.users);
	const router = useRouter();
	// set active
	let pathIsActive =
		router.pathname === path ||
		(router.pathname === '/project' && path === '/login' && isAuth);

	return (
		<Link href={isAuth && path === '/login' ? '/project' : path}>
			<a
				className={`flex items-center hover:text-blue-darkest ${
					pathIsActive ? `text-blue-darkest` : `text-white`
				}`}
			>
				<div className='w-2 sm:w-3.5'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 -1 8 16'
						preserveAspectRatio='xMinYMin'
						className='fill-current w-full'
					>
						<path d='M2.757 7l4.95 4.95a1 1 0 1 1-1.414 1.414L.636 7.707a1 1 0 0 1 0-1.414L6.293.636A1 1 0 0 1 7.707 2.05L2.757 7z'></path>
					</svg>
				</div>
				{path === '/login' && isAuth ? (
					<div className='w-5 m-1 sm:w-8 text-blue-darkest'>
						<svg
							className='fill-current w-full h-full'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='-2 -2 24 24'
							width='24'
							height='24'
							preserveAspectRatio='xMinYMin'
						>
							<path d='M4 0h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm1.229 16H4a2 2 0 0 1-.813-.172 5.58 5.58 0 0 1 3.347-3.758 1 1 0 1 1 .733 1.86A3.579 3.579 0 0 0 5.229 18zm9.512 0a3.658 3.658 0 0 0-2.097-2.066 1 1 0 1 1 .712-1.868 5.659 5.659 0 0 1 3.437 3.77A1.993 1.993 0 0 1 16 18h-1.26zM10 4a4 4 0 0 1 4 4v2a4 4 0 1 1-8 0V8a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v2a2 2 0 1 0 4 0V8a2 2 0 0 0-2-2z'></path>
						</svg>
					</div>
				) : (
					<p className='font-semibold text-xs mx-0.5 sm:mx-2 sm:text-lg whitespace-nowrap text-blue-darkest'>
						{title}
					</p>
				)}
				<div className='w-2 sm:w-3.5'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 -1 8 16'
						preserveAspectRatio='xMinYMin'
						className='fill-current w-full'
					>
						<path d='M5.314 7.071l-4.95-4.95A1 1 0 0 1 1.778.707l5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-1.414-1.414l4.95-4.95z'></path>
					</svg>
				</div>
			</a>
		</Link>
	);
};

export default HeaderLink;
