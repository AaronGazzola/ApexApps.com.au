import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAppDispatch } from '../../redux/hooks';
import { login } from '../../redux/users/users.slice';

const index = () => {
	const dispatch = useAppDispatch();
	const [formState, setFormState] = useState({
		email: {
			value: '',
			isValid: false,
			isTouched: false
		},
		password: {
			value: '',
			isValid: false,
			isTouched: false
		}
	} as { [index: string]: any });

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		const isValid =
			target.id === 'email'
				? /^\S+@\S+\.\S+$/.test(target.value)
				: target.value.length >= 6;
		setFormState({
			...formState,
			[target.id]: {
				...formState[target.id],
				value: target.value,
				isValid
			}
		});
	};

	const touchHandler = (e: React.FocusEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		setFormState({
			...formState,
			[target.id]: {
				...formState[target.id],
				isTouched: true
			}
		});
	};

	const submitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		dispatch(
			login({
				username: formState.email.value,
				password: formState.password.value
			})
		);
	};
	return (
		<>
			<h1 className='text-4xl text-blue-darkest my-4'>Log in</h1>
			<form
				onSubmit={submitHandler}
				className='bg-white rounded-2xl shadow-lg p-4 flex flex-col w-80'
			>
				<Input
					placeholder='Email'
					type='text'
					value={formState.email.value}
					changeHandler={changeHandler}
					id='email'
					isValid={formState.email.isValid}
					helperText='Please enter your email address'
					isTouched={formState.email.isTouched}
					touchHandler={touchHandler}
					label='Email'
				/>
				<Input
					placeholder='Password'
					type='password'
					value={formState.password.value}
					changeHandler={changeHandler}
					id='password'
					isValid={formState.password.isValid}
					helperText='Please enter your password'
					isTouched={formState.password.isTouched}
					touchHandler={touchHandler}
					label='Password'
				/>
				<Button
					label='Log in'
					type='submit'
					fullWidth
					color='green'
					variant='contained'
					disabled={!formState.email.isValid || !formState.email.isValid}
				/>
			</form>
		</>
	);
};

export default index;
