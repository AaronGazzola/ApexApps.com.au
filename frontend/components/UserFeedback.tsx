import Snackbar from './Snackbar';
import Dialog from './Dialog';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearUsers } from '../redux/users/users.slice';
import { useEffect, useState } from 'react';

const UserFeedback = () => {
	const dispatch = useAppDispatch();
	const { users, utils } = useAppSelector(state => state);
	const clickHandler = (e: React.SyntheticEvent) => {
		dispatch(clearUsers());
	};

	// if success, clear slice on window click
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
	return (
		<>
			{!!users.error && (
				<Dialog type='error' message={users.error} onClick={clickHandler} />
			)}
			<Snackbar
				type='success'
				message={users.success}
				onClick={clickHandler}
				show={!!users.success}
			/>
		</>
	);
};

export default UserFeedback;
