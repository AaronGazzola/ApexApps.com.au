import React, { useRef, useEffect, MouseEventHandler } from 'react';
import SVG from './SVG';

interface SnackbarProps {
	onClick: MouseEventHandler;
	type: 'success' | 'error' | 'alert';
	message?: string;
	show: boolean;
}

const Snackbar = (props: SnackbarProps) => {
	const { onClick, type, message, show } = props;

	return (
		<div
			className={`fixed bottom-2 left-1/2 transform -translate-x-1/2 bg-green flex justify-between text-white py-3 px-4 rounded-xl items-center shadow-md transition-transform duration-150 ease-in-out
      ${show ? '' : 'translate-y-16'}`}
			onClick={onClick}
		>
			<p className='font-medium text-lg'>{message ? message : 'Success!'}</p>
			<div className='w-7 ml-3'>
				<SVG name='close' className='fill-current w-full h-full' />
			</div>
		</div>
	);
};

export default Snackbar;
