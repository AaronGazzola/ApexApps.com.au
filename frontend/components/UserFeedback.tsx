import Snackbar from './Snackbar';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearUsers, getUser, getUsers } from '../redux/users/users.slice';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import Button from './Button';

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
		let timer: ReturnType<typeof setTimeout>;
		if (users.success && !users.error && !users.alert) {
			timer = setTimeout(() => dispatch(clearUsers()), 3000);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [users.success]);

	return (
		<>
			<Modal
				isOpen={!!users.alert || !!users.error}
				onClose={() => dispatch(clearUsers())}
			>
				<h2
					className={`title-sm ${
						users.error
							? 'text-red'
							: users.alert?.titleColor
							? users.alert?.titleColor
							: ''
					}`}
				>
					{users.error?.title
						? users.error?.title
						: users.error
						? 'Error'
						: users.alert?.title
						? users.alert?.title
						: 'Alert'}
				</h2>
				<p className={`font-medium text-gray-dark my-3`}>
					{users.error
						? users.error.message
						: users.alert?.message
						? users.alert?.message
						: ''}
				</p>
				<div className='flex w-full justify-between'>
					{users.alert?.link ? (
						<Button
							path={users.alert?.link}
							type='link'
							label={users.alert?.buttonLabel}
							color={users.alert?.buttonColor ? users.alert?.buttonColor : ''}
							variant='simple'
							buttonClasses='px-4'
						/>
					) : users.error?.retry ? (
						<Button
							type='button'
							label='Retry'
							color='green'
							variant='simple'
							buttonClasses='px-4'
							onClick={
								users.error?.retry === 'getUsers'
									? () => {
											dispatch(getUsers());
											dispatch(clearUsers());
									  }
									: () => {
											dispatch(getUser());
											dispatch(clearUsers());
									  }
							}
						/>
					) : (
						<div className='w-10'></div>
					)}
					<Button
						onClick={() => dispatch(clearUsers())}
						type='button'
						label='OK'
						color='blue-darkest'
						variant='simple'
						buttonClasses='px-4'
					/>
				</div>
			</Modal>
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
