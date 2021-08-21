import React, { SyntheticEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addUser } from '../redux/users/users.slice';
import Button from './Button';
import Input from './Input';

const AddClientModal = () => {
	const dispatch = useAppDispatch();
	const { loading } = useAppSelector(state => state.users);
	const [state, setState] = useState({
		name: {
			value: '',
			isValid: false,
			isTouched: false
		}
	} as { [index: string]: any });
	const { name } = state;

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		setState({
			...state,
			[target.id]: {
				...state[target.id],
				value: target.value,
				isValid: target.value.length && target.value.length < 30
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
		if (name.isValid) dispatch(addUser(name.value));
	};
	return (
		<form
			onSubmit={submitHandler}
			className='w-full flex flex-col items-center'
		>
			<h2 className='title-sm text-center'>Edit Profile</h2>
			<Input
				type='text'
				validation
				isValid={name.isValid}
				placeholder='Name'
				value={name.value}
				label='Name'
				onChange={changeHandler}
				id='name'
				isTouched={name.isTouched}
				touchHandler={touchHandler}
				fullWidth
				helperText={
					!name.isValid && name.isTouched
						? 'Please enter a name below 30 characters'
						: ''
				}
			/>
			<Button
				variant='contained'
				type='submit'
				color='green'
				label='Add Client'
				fullWidth
				disabled={!name.isValid}
				buttonClasses='p-2 mt-4'
				loading={loading}
			/>
		</form>
	);
};

export default AddClientModal;
