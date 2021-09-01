import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '../redux/hooks';

interface LogoProps {
	variant: 'header' | 'drawer-sm' | 'drawer-lg';
}

const Logo = (props: LogoProps) => {
	const { isAuth } = useAppSelector(state => state.users);
	const { variant } = props;
	const { breakpoint } = useAppSelector(state => state.utils);

	let width = 40;
	let height = 40;

	switch (variant) {
		case 'header':
			width = height = breakpoint === 'xs' ? 40 : 60;
			break;
		case 'drawer-sm':
			width = height = 30;
			break;
		case 'drawer-lg':
			width = height = 55;
			break;
		default:
			break;
	}

	return (
		<Link href={isAuth ? '/project' : '/'}>
			<div className='my-0.5 flex flex-col content-center cursor-pointer'>
				<Image
					src='/assets/svg/logo_50.svg'
					alt='Apex Apps logo'
					width={width}
					height={height}
				/>
				{variant !== 'drawer-sm' && (
					<p className='font-extrabold text-xxxs sm:text-xs text-blue-darkest whitespace-nowrap'>
						APEX APPS
					</p>
				)}
			</div>
		</Link>
	);
};

export default Logo;
