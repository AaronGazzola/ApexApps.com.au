import React, { SyntheticEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
	addProject,
	updateProjectTitle
} from '../redux/projects/projects.slice';
import Button from './Button';
import Input from './Input';

interface ProjectModalProps {
	title?: string;
	clientId?: string;
	projectId?: string;
}

const ProjectModal = (props: ProjectModalProps) => {
	const { title: projectTitle = '', clientId = '', projectId = '' } = props;
	const dispatch = useAppDispatch();
	const { loading } = useAppSelector(state => state.users);
	const [state, setState] = useState({
		title: {
			value: projectTitle,
			isValid: !!projectTitle,
			isTouched: false,
			isChanged: !projectTitle
		}
	} as { [index: string]: any });
	const { title } = state;

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		setState({
			...state,
			[target.id]: {
				...state[target.id],
				value: target.value,
				isValid: target.value.length && target.value.length < 30,
				isChanged: projectTitle ? target.value !== projectTitle : true
			}
		});
	};

	const touchHandler = (e: React.FocusEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		setState({
			...state,
			[target.id]: {
				...state[target.id],
				isTouched: true
			}
		});
	};

	const submitHandler = (e: SyntheticEvent) => {
		e.preventDefault();
		if (title.isValid && !projectTitle) {
			dispatch(addProject({ title: title.value, clientId }));
		} else if (title.isValid && projectTitle) {
			dispatch(updateProjectTitle({ title: title.value, projectId }));
		}
	};
	return (
		<form
			onSubmit={submitHandler}
			className='w-full flex flex-col items-center'
		>
			<h2 className='title-sm text-center'>
				{projectTitle ? 'Edit' : 'Add'} Client
			</h2>
			<Input
				type='text'
				validation={!projectTitle || projectTitle !== title.value}
				isValid={title.isValid}
				placeholder='title'
				value={title.value}
				label='title'
				onChange={changeHandler}
				id='title'
				isTouched={title.isTouched}
				touchHandler={touchHandler}
				fullWidth
				helperText={
					!title.isValid && title.isTouched
						? 'Please enter a title below 30 characters'
						: ''
				}
			/>
			<Button
				variant='contained'
				type='submit'
				color='green'
				label={`${projectTitle ? 'Update' : 'Add'} Project`}
				fullWidth
				disabled={
					projectTitle
						? !title.isValid || title.value === projectTitle
						: !title.isValid
				}
				buttonClasses='p-2 mt-4'
				loading={loading}
			/>
		</form>
	);
};

export default ProjectModal;
