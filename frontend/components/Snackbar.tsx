import React, { MouseEventHandler } from 'react';
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
			className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-green flex justify-between text-white py-3 px-4 rounded-t-xl items-center  transition-transform duration-150 ease-in-out z-50
      ${show ? '' : 'translate-y-20'}`}
			onClick={onClick}
			style={{
				boxShadow: '2px 2px 4px 3px rgba(0,0,0,.3)'
			}}
		>
			<p className='font-medium text-lg'>{message ? message : 'Success!'}</p>
			<div className='w-7 ml-3'>
				<SVG name='close' classes='fill-current w-full h-full' />
			</div>
		</div>
	);
};

export default Snackbar;
