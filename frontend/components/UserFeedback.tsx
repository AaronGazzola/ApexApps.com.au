import Snackbar from './Snackbar';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearUsers, getUser, getUsers } from '../redux/users/users.slice';
import { clearProjects } from '../redux/projects/projects.slice';
import { useEffect } from 'react';
import Modal from './Modal';
import Button from './Button';

const UserFeedback = () => {
	const dispatch = useAppDispatch();
	const { users, projects } = useAppSelector(state => state);
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

	const error = users.error || projects.error;
	const success = users.success || projects.success;
	const alert = users.alert || projects.alert;

	return (
		<>
			<Modal
				isOpen={!!error || !!alert}
				onClose={() => {
					dispatch(clearUsers());
					dispatch(clearProjects());
				}}
			>
				<h2
					className={`title-sm ${
						error ? 'text-red' : alert?.titleColor ? alert?.titleColor : ''
					}`}
				>
					{error?.title
						? error?.title
						: error
						? 'Error'
						: alert?.title
						? alert?.title
						: 'Alert'}
				</h2>
				<p className={`font-medium text-gray-dark my-3`}>
					{error ? error.message : alert?.message ? alert?.message : ''}
				</p>
				<div className='flex w-full justify-between'>
					{alert?.link ? (
						<Button
							path={alert?.link}
							type='link'
							label={alert?.buttonLabel}
							color={alert?.buttonColor ? alert?.buttonColor : ''}
							variant='simple'
							buttonClasses='px-4'
						/>
					) : error?.retry ? (
						<Button
							type='button'
							label='Retry'
							color='green'
							variant='simple'
							buttonClasses='px-4'
							onClick={
								error?.retry === 'getUsers'
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
				message={success}
				onClick={clickHandler}
				show={!!success}
			/>
		</>
	);
};

export default UserFeedback;
