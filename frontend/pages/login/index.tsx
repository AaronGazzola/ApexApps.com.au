import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { login, userTour } from '../../redux/users/users.slice';
import SVG from '../../components/SVG';
import { milestonesTour } from '../../redux/milestones/milestones.slice';
import { projectsTour } from '../../redux/projects/projects.slice';
import { useRouter } from 'next/router';
import Meta from '../../components/Meta';

const index = () => {
	const router = useRouter();
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
	const { email, password } = formState;

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		const isValid =
			target.id === 'email'
				? /^\S+@\S+\.\S+$/.test(target.value)
				: target.value.length >= 6 && target.value.length <= 20;
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
		if (!email.isValid || !password.isValid) {
			setFormState({
				...formState,
				email: {
					...email,
					isTouched: true
				},
				password: {
					...password,
					isTouched: true
				}
			});
		}
	};

	const submitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (email.isValid && password.isValid) {
			dispatch(
				login({
					username: email.value,
					password: password.value
				})
			);
		}
	};

	const takeTourHandler = () => {
		dispatch(userTour());
		dispatch(milestonesTour());
		dispatch(projectsTour());
	};

	return (
		<>
			<Meta title='Log in | Apex Apps' />
			<h1 className='title'>Log in</h1>
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
							: ' '
					}
					isTouched={email.isTouched}
					touchHandler={touchHandler}
					label='Email'
					containerClasses=''
				/>
				<Input
					placeholder='Password'
					type='password'
					value={password.value}
					onChange={changeHandler}
					id='password'
					isValid={password.isValid}
					helperText={
						password.isTouched && !password.isValid
							? 'Please enter your password'
							: ''
					}
					isTouched={password.isTouched}
					touchHandler={touchHandler}
					label='Password'
					containerClasses='mb-4'
				/>
				<Button
					label='Log in'
					type='submit'
					size='large'
					fullWidth
					color='green'
					variant='contained'
					disabled={!email.isValid || !password.isValid}
					onClick={buttonClickHandler}
					loading={loading}
					buttonClasses='p-2 shadow-sm'
				/>
				<Button
					label='Request access'
					path='/contact'
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
				<Button
					label='Forgot password'
					path='/forgot-password'
					startIcon={<div className='w-5'></div>}
					endIcon={
						<div className='w-5 h-5'>
							<SVG name='medical' classes='fill-current w-full' />
						</div>
					}
					type='link'
					fullWidth
					color='blue-darkest'
					variant='simple'
					size='small'
					buttonClasses='mt-3 uppercase px-1 py-0.5 border-b shadow-sm'
				/>
				<Button
					label='Take a tour'
					startIcon={<div className='w-5'></div>}
					endIcon={
						<div className='w-5 h-5'>
							<SVG name='map' classes='fill-current w-full' />
						</div>
					}
					type='button'
					fullWidth
					color='green-700'
					variant='simple'
					size='small'
					buttonClasses='mt-3 uppercase px-1 py-0.5 border-b shadow-sm'
					onClick={takeTourHandler}
				/>
			</form>
		</>
	);
};

export default index;
