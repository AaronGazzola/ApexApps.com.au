import Snackbar from './Snackbar';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
	clearUsers,
	getUser,
	getUsers,
	usersLogout
} from '../redux/users/users.slice';
import {
	clearProjects,
	projectsLogout
} from '../redux/projects/projects.slice';
import { useCallback, useEffect } from 'react';
import Modal from './Modal';
import Button from './Button';
import {
	clearMilestones,
	milestonesLogout
} from '../redux/milestones/milestones.slice';
import { useRouter } from 'next/router';
import SVG from './SVG';

const UserFeedback = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const {
		users,
		projects,
		milestones,
		users: { onTour }
	} = useAppSelector(state => state);
	const error = users.error || projects.error || milestones.error;
	const success = users.success || projects.success || milestones.success;
	const alert = users.alert || projects.alert;

	const clearState = useCallback(() => {
		dispatch(clearUsers());
		dispatch(clearProjects());
		dispatch(clearMilestones());
	}, [dispatch]);
	const logout = () => {
		dispatch(usersLogout());
		dispatch(milestonesLogout());
		dispatch(projectsLogout());
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
	}, [success, clearState]);

	// clear users after timeout
	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;
		if (success && !error && !alert) {
			timer = setTimeout(() => {
				clearState();
			}, 3000);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [success, alert, clearState, error]);

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
						error
							? 'text-red'
							: alert?.titleColor
							? `text-${alert?.titleColor}`
							: ''
					}`}
				>
					{error?.message === 'Unauthorized' && onTour
						? 'Unauthorized'
						: error?.title
						? error?.title
						: error
						? 'Error'
						: alert?.title
						? alert?.title
						: 'Alert'}
				</h2>
				<p className={`font-medium text-gray-dark my-3 px-2`}>
					{error?.message === 'Unauthorized' && onTour
						? 'Contact Aaron to request access'
						: error?.message
						? error.message
						: alert?.message
						? alert?.message
						: ''}
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
					) : error?.retry && !onTour ? (
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
					) : error?.message === 'Unauthorized' && onTour ? (
						<Button
							type='button'
							label='Request access'
							color='yellow'
							variant='simple'
							startIcon={
								<SVG name='key' classes='fill-current text-yellow mr-2' />
							}
							buttonClasses='px-2 py-1.5 border border-yellow'
							onClick={() => {
								clearState();
								router.push('/contact');
							}}
						/>
					) : (
						<div className='w-10'></div>
					)}
					<Button
						onClick={() => {
							clearState();
							if (error?.message === 'Unauthorized' && !onTour) {
								logout();
								router.push('/login');
							}
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
