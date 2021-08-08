import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '../redux/hooks';

const Logo = () => {
	const { breakpoint } = useAppSelector(state => state.utils);
	return (
		<Link href='/'>
			<div className='my-0.5 flex flex-col content-center w-min cursor-pointer'>
				<Image
					src='/assets/svg/logo_50.svg'
					alt='Apex Apps logo'
					width={breakpoint === 'xs' ? 40 : 60}
					height={breakpoint === 'xs' ? 40 : 60}
				/>
				<p className='font-extrabold text-xxxs sm:text-xxs text-blue-darkest whitespace-nowrap'>
					APEX APPS
				</p>
			</div>
		</Link>
	);
};

export default Logo;
