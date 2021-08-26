import React, { SyntheticEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addUser, updateClient } from '../redux/users/users.slice';
import Button from './Button';
import Input from './Input';

interface ClientModalProps {
	clientName?: string;
	id?: string;
}

const ClientModal = (props: ClientModalProps) => {
	const { clientName = '', id = '' } = props;
	const dispatch = useAppDispatch();
	const { loading } = useAppSelector(state => state.users);
	const [state, setState] = useState({
		name: {
			value: clientName,
			isValid: !!clientName,
			isTouched: false,
			isChanged: !clientName
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
				isValid: target.value.length && target.value.length < 30,
				isChanged: clientName ? target.value !== clientName : true
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
		if (name.isValid && !clientName) {
			dispatch(addUser(name.value));
		} else if (name.isValid && clientName) {
			dispatch(updateClient(name.value));
		}
	};
	return (
		<form
			onSubmit={submitHandler}
			className='w-full flex flex-col items-center'
		>
			<h2 className='title-sm text-center'>
				{clientName ? 'Edit' : 'Add'} Client
			</h2>
			<Input
				type='text'
				validation={!clientName || clientName !== name.value}
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
				label={`${clientName ? 'Update' : 'Add'} Client`}
				fullWidth
				disabled={
					clientName
						? !name.isValid || name.value === clientName
						: !name.isValid
				}
				buttonClasses='p-2 mt-4'
				loading={loading}
			/>
		</form>
	);
};

export default ClientModal;
