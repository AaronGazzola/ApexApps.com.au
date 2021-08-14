import React, { useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { clearUsers } from '../redux/users/users.slice';
import SVG from './SVG';

const Snackbar = () => {
	const { users } = useAppSelector(state => state);

	const dispatch = useAppDispatch();
	const clickHandler = (e: React.SyntheticEvent) => {
		dispatch(clearUsers());
	};

	// if success, clear slice on click anywhere
	useEffect(() => {
		function handleClickOutside(event: TouchEvent | MouseEvent) {
			if (users.success) {
				dispatch(clearUsers());
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [users.success]);

	// clear users after timeout
	useEffect(() => {
		let timer = setTimeout(() => dispatch(clearUsers()), 3000);
		return () => {
			clearTimeout(timer);
		};
	}, [users.success]);

	if (users.success) {
		return (
			<div
				className='fixed bottom-2 left-1/2 transform -translate-x-1/2 bg-green flex justify-between text-white py-3 px-4 rounded-xl items-center'
				onClick={clickHandler}
			>
				<p className='font-medium text-lg'>{users.success}</p>
				<div className='w-7 ml-3'>
					<SVG name='close' className='fill-current w-full h-full' />
				</div>
			</div>
		);
	} else return <></>;
};

export default Snackbar;
