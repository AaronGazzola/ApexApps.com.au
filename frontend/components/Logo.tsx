import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '../redux/hooks';

interface LogoProps {
	variant: 'header' | 'drawer';
	drawerIsOpen?: boolean;
}

const Logo = (props: LogoProps) => {
	const { variant, drawerIsOpen } = props;
	const { breakpoint } = useAppSelector(state => state.utils);

	let width = 40;
	let height = 40;

	switch (variant) {
		case 'header':
			width = height = breakpoint === 'xs' ? 40 : 60;
			break;
		case 'drawer':
			width = height =
				drawerIsOpen && breakpoint === 'xs'
					? 40
					: drawerIsOpen || breakpoint === 'xl' || breakpoint === '2xl'
					? 55
					: 30;
			break;
		default:
			break;
	}

	return (
		<Link href='/'>
			<div className='my-0.5 flex flex-col content-center cursor-pointer'>
				<Image
					src='/assets/svg/logo_50.svg'
					alt='Apex Apps logo'
					width={width}
					height={height}
				/>
				{(variant === 'header' ||
					breakpoint === 'xl' ||
					breakpoint === '2xl' ||
					drawerIsOpen) && (
					<p className='font-extrabold text-xxxs sm:text-xxs text-blue-darkest whitespace-nowrap'>
						APEX APPS
					</p>
				)}
			</div>
		</Link>
	);
};

export default Logo;
