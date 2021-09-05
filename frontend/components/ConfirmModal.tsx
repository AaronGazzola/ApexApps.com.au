import React from 'react';
import { useAppSelector } from '../redux/hooks';
import Button from './Button';

interface ConfirmModalProps {
	content?: string;
	confirmFunction: () => void;
	cancelFunction: () => void;
	type: 'delete';
}

const ConfirmModal = (props: ConfirmModalProps) => {
	const { content = '', type, confirmFunction, cancelFunction } = props;
	const { loading: projectsLoading } = useAppSelector(state => state.projects);
	const { loading: usersLoading } = useAppSelector(state => state.users);
	const loading = projectsLoading || usersLoading;

	return (
		<>
			<h2
				className={`title-sm ${
					type === 'delete' ? 'text-red' : 'text-blue-darkest'
				}`}
			>
				Confirm {type[0].toUpperCase() + type.slice(1)}
			</h2>
			<p className={`font-medium text-gray-dark my-3 text-center`}>
				{content && type === 'delete' ? (
					<>
						Are you sure you want to delete:
						<br />
						<span className='font-semibold'>{content}</span>?
					</>
				) : (
					'Are you sure?'
				)}
			</p>
			<div className='flex w-full justify-between'>
				<Button
					onClick={cancelFunction}
					type='button'
					label='Cancel'
					color='blue-darkest'
					variant='simple'
					buttonClasses='px-4'
				/>
				<Button
					type='button'
					label={type[0].toUpperCase() + type.slice(1)}
					color={type === 'delete' ? 'red' : 'green'}
					variant='simple'
					buttonClasses='px-4'
					onClick={confirmFunction}
					loading={loading}
				/>
			</div>
		</>
	);
};

export default ConfirmModal;
