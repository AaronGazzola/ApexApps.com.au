import Image from 'next/image';
import { useAppSelector } from '../redux/hooks';

const Logo = () => {
	const { breakpoint } = useAppSelector(state => state.utils);
	return (
		<div className='my-0.5 flex flex-col content-center w-min'>
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
	);
};

export default Logo;
