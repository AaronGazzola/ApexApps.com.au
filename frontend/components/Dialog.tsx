import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearUsers } from '../redux/users/users.slice';
import Button from './Button';

interface DialogProps {}

const Dialog = (props: DialogProps) => {
	const { users } = useAppSelector(state => state);

	const dispatch = useAppDispatch();
	const clickHandler = (e: React.SyntheticEvent) => {
		dispatch(clearUsers());
	};

	if (users.error) {
		return (
			<>
				<div className='box-xs xm:box-sm fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
					<h2 className={`title-sm text-red`}>Error</h2>
					<p className={`font-medium text-gray-dark my-3`}>{users.error}</p>
					<div className='flex justify-end'>
						<Button
							type='button'
							clickHandler={clickHandler}
							label='OK'
							color='blue-darkest'
							variant='outlined'
							classes='px-4'
						/>
					</div>
				</div>
				<div
					onClick={clickHandler}
					className='fixed top-0 left-0 bottom-0 right-0 bg-gray-dark opacity-50 z-40'
				></div>
			</>
		);
	} else {
		return <></>;
	}
};

export default Dialog;
