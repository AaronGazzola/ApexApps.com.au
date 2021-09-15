import React from 'react';
import moment from 'moment';
import Link from 'next/link';

interface FooterProps {
	footerHeight: number;
}

const Footer = (props: FooterProps) => {
	const { footerHeight } = props;
	return (
		<footer
			className='flex flex-col items-center pt-8 ml-8 sm:ml-0'
			style={{ height: footerHeight }}
		>
			<hr className='w-72 h-0.5 bg-gray-300 my-2' />
			<p className='text-gray-600 text-sm'>
				Designed and Developed by Apex Apps
			</p>
			<p className='text-gray-600 text-sm'>
				Copyright &copy; Apex Apps {moment().format('YYYY')}
			</p>
			<Link href='/terms' passHref>
				<p className='text-sm text-green-700 font-semibold cursor-pointer'>
					Terms and conditions
				</p>
			</Link>
		</footer>
	);
};

export default Footer;
