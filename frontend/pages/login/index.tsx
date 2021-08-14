import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { login } from '../../redux/users/users.slice';
import SVG from '../../components/SVG';

const index = () => {
	const dispatch = useAppDispatch();
	const { loading } = useAppSelector(state => state.users);
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
				login({
					username: formState.email.value,
					password: formState.password.value
				})
			);
		}
	};

	return (
		<>
			<h1 className='title'>Log in</h1>
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
					label='Log in'
					type='submit'
					size='large'
					fullWidth
					color='green'
					variant='contained'
					disabled={!formState.email.isValid || !formState.password.isValid}
					onClick={buttonClickHandler}
					loading={loading}
					classes='p-2'
				/>
				<Button
					label='Request signup'
					path='/contact'
					startIcon={<div className='w-7'></div>}
					endIcon={<SVG name='key' className='fill-current' />}
					type='link'
					fullWidth
					color='yellow'
					variant='outlined'
					size='small'
					classes='mt-3 uppercase px-1 py-0.5'
				/>
				<Button
					label='Take a tour'
					path='#'
					startIcon={<div className='w-7'></div>}
					endIcon={<SVG name='map' className='fill-current' />}
					type='link'
					fullWidth
					color='green-700'
					variant='outlined'
					size='small'
					classes='mt-3 uppercase px-1 py-0.5'
				/>
			</form>
		</>
	);
};

export default index;
