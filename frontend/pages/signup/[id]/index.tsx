import React, { useState } from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { login, signup } from '../../../redux/users/users.slice';
import SVG from '../../../components/SVG';

const index = () => {
	const dispatch = useAppDispatch();
	const { loading } = useAppSelector(state => state.users);
	const [formState, setFormState] = useState({
		name: {
			value: '',
			isValid: false,
			isTouched: false
		},
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
	const { name, email, password } = formState;
	const formIsValid = name.isValid && email.isValid && password.isValid;

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		const isValid =
			target.id === 'name'
				? target.value.length < 30
				: target.id === 'email'
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

	const buttonClickHandler = (e: React.MouseEvent) => {
		if (!formState.email.isValid || !formState.password.isValid) {
			setFormState({
				...formState,
				email: {
					...formState.email,
					isTouched: true
				},
				password: {
					...formState.password,
					isTouched: true
				}
			});
		}
	};

	const submitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (formState.email.isValid && formState.password.isValid) {
			dispatch(
				signup({
					userName: formState.name.value,
					email: formState.email.value,
					password: formState.password.value
				})
			);
		}
	};

	return (
		<>
			<h1 className='title'>Sign Up</h1>
			<form onSubmit={submitHandler} className='box-xs sm:box-sm'>
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
					label='Sign up'
					type='submit'
					size='large'
					fullWidth
					color='green'
					variant='contained'
					disabled={!formIsValid}
					clickHandler={buttonClickHandler}
					loading={loading}
					extendClass='p-2'
				/>
				<Button
					label='Back to log in'
					path='/login'
					startIcon={<div className='w-7'></div>}
					endIcon={<SVG className='fill-current' name='key' />}
					type='link'
					fullWidth
					color='yellow'
					variant='outlined'
					size='small'
					extendClass='mt-3 uppercase p-1'
				/>
			</form>
		</>
	);
};

export default index;
