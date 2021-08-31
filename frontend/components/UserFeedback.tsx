import Snackbar from './Snackbar';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearUsers, getUser, getUsers } from '../redux/users/users.slice';
import { clearProjects } from '../redux/projects/projects.slice';
import { useEffect } from 'react';
import Modal from './Modal';
import Button from './Button';
import { clearMilestones } from '../redux/milestones/milestones.slice';

const UserFeedback = () => {
	const dispatch = useAppDispatch();
	const { users, projects, milestones } = useAppSelector(state => state);
	const error = users.error || projects.error || milestones.error;
	const success = users.success || projects.success || milestones.success;
	const alert = users.alert || projects.alert;

	const clearState = () => {
		dispatch(clearUsers());
		dispatch(clearProjects());
		dispatch(clearMilestones());
	};

	const clickHandler = (e: React.SyntheticEvent) => {
		clearState();
	};

	// if success, clear slice on window click
	useEffect(() => {
		function handleClickOutside(event: TouchEvent | MouseEvent) {
			if (success) {
				clearState();
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [success]);

	// clear users after timeout
	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;
		if (error || success || alert) {
			timer = setTimeout(() => {
				clearState();
			}, 3000);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [success]);

	return (
		<>
			<Modal
				userFeedback
				isOpen={!!error || !!alert}
				onClose={() => {
					clearState();
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
						onClick={() => {
							clearState();
						}}
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
