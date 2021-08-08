import Link from 'next/link';
import { useRouter } from 'next/router';

interface HeaderLinkProps {
	path: string;
	title: string;
}

const HeaderLink = (props: HeaderLinkProps) => {
	const { title, path } = props;
	const router = useRouter();
	const pathIsActive = router.pathname === path;

	return (
		<Link href={path}>
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
				<p className='font-semibold text-xs mx-0.5 sm:mx-2 sm:text-lg whitespace-nowrap text-blue-darkest'>
					{title}
				</p>
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
