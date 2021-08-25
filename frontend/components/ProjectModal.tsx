import React, { SyntheticEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addProject, editProject } from '../redux/projects/projects.slice';
import Button from './Button';
import Input from './Input';

interface ProjectModalProps {
	title?: string;
	clientId?: string;
	projectId?: string;
	description?: string;
	type: 'add' | 'edit';
}

const ProjectModal = (props: ProjectModalProps) => {
	const {
		title: projectTitle = '',
		description: projectDescription = '',
		clientId = '',
		projectId = '',
		type
	} = props;
	const dispatch = useAppDispatch();
	const { loading } = useAppSelector(state => state.projects);
	const [state, setState] = useState({
		title: {
			value: projectTitle,
			isValid: !!projectTitle,
			isTouched: false,
			isChanged: !projectTitle
		},
		description: {
			value: projectDescription,
			isValid: !!projectDescription,
			isTouched: false,
			isChanged: !projectDescription
		}
	} as { [index: string]: any });
	const { title, description } = state;

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		const isValid =
			type === 'add'
				? target.value.length && target.value.length < 30
				: target.value.length && target.value.length < 500;
		setState({
			...state,
			[target.id]: {
				...state[target.id],
				value: target.value,
				isValid,
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
		if (title.isValid && type == 'add') {
			dispatch(addProject({ title: title.value, clientId }));
		} else if (title.isValid && description.isValid && 'edit') {
			dispatch(
				editProject({
					title: title.value,
					projectId,
					description: description.value
				})
			);
		}
	};
	return (
		<form
			onSubmit={submitHandler}
			className='w-full flex flex-col items-center'
		>
			<h2 className='title-sm text-center'>
				{type === 'edit' ? 'Edit' : 'Add'} Project
			</h2>
			<Input
				type='text'
				validation={type === 'add' || projectTitle !== title.value}
				isValid={title.isValid}
				placeholder='Project Title'
				value={title.value}
				label='Project Title'
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
				autoFocus
			/>
			{type === 'edit' && (
				<Input
					type='text'
					validation={
						!projectDescription || projectDescription !== description.value
					}
					isValid={description.isValid}
					placeholder='Project Description'
					value={description.value}
					label='Project description'
					onChange={changeHandler}
					id='description'
					isTouched={description.isTouched}
					touchHandler={touchHandler}
					fullWidth
					helperText={
						!description.isValid && description.isTouched
							? 'Please enter a description below 500 characters'
							: ''
					}
				/>
			)}
			<Button
				variant='contained'
				type='submit'
				color='green'
				label={`${projectTitle ? 'edit' : 'Add'} Project`}
				fullWidth
				disabled={
					type === 'edit'
						? !title.isValid ||
						  title.value === projectTitle ||
						  !description.isValid ||
						  description.value === projectDescription
						: !title.isValid
				}
				buttonClasses='p-2 mt-4'
				loading={loading}
			/>
		</form>
	);
};

export default ProjectModal;
