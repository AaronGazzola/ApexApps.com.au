import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { forgotPassword } from '../../redux/users/users.slice';
import SVG from '../../components/SVG';
import Meta from '../../components/Meta';

const index = () => {
	const dispatch = useAppDispatch();
	const { loading } = useAppSelector(state => state.users);
	const [formState, setFormState] = useState({
		email: {
			value: '',
			isValid: false,
			isTouched: false
		}
	} as { [index: string]: any });
	const { email } = formState;

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		const isValid = /^\S+@\S+\.\S+$/.test(target.value);
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
		if (!email.isValid) {
			setFormState({
				...formState,
				email: {
					...email,
					isTouched: true
				}
			});
		}
	};

	const submitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (email.isValid) {
			dispatch(forgotPassword(email.value));
		}
	};

	return (
		<>
			<Meta title='Forgot password | Apex Apps' />
			<h1 className='title'>Forgot Password</h1>
			<form onSubmit={submitHandler} className='box w-72 sm:w-80'>
				<Input
					placeholder='Email'
					type='text'
					value={email.value}
					onChange={changeHandler}
					id='email'
					isValid={email.isValid}
					helperText={
						email.isTouched && !email.isValid
							? 'Please enter your email address'
							: ''
					}
					isTouched={email.isTouched}
					touchHandler={touchHandler}
					label='Email'
					containerClasses='mb-4'
				/>
				<Button
					label='Send Reset Email'
					type='submit'
					size='large'
					fullWidth
					color='green'
					variant='contained'
					disabled={!email.isValid}
					onClick={buttonClickHandler}
					loading={loading}
					buttonClasses='p-2 shadow-sm'
				/>
				<Button
					label='Back to log in'
					path='/login'
					startIcon={<div className='w-5'></div>}
					endIcon={
						<div className='w-5 h-5'>
							<SVG name='key' classes='fill-current w-full' />
						</div>
					}
					type='link'
					fullWidth
					color='yellow'
					variant='simple'
					size='small'
					buttonClasses='mt-3 uppercase px-1 py-0.5 border-b shadow-sm'
				/>
			</form>
		</>
	);
};

export default index;
