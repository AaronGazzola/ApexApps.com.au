import React, { MouseEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearUsers } from '../redux/users/users.slice';
import Button from './Button';

interface DialogProps {
	title?: string;
	type: 'success' | 'error' | 'alert';
	message: string;
	onClick: MouseEventHandler;
}

const Dialog = (props: DialogProps) => {
	const { message, title, type, onClick } = props;

	return (
		<>
			<div className='box-xs xm:box-sm fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
				<h2 className={`title-sm text-red`}>
					{title ? title : type[0].toUpperCase() + type.slice(1)}
				</h2>
				<p className={`font-medium text-gray-dark my-3`}>{message}</p>
				<div className='flex justify-end'>
					<Button
						type='button'
						onClick={onClick}
						label='OK'
						color='blue-darkest'
						variant='outlined'
						classes='px-4'
					/>
				</div>
			</div>
			<div
				onClick={onClick}
				className='fixed top-0 left-0 bottom-0 right-0 bg-gray-dark opacity-50 z-40'
			></div>
		</>
	);
};

export default Dialog;
