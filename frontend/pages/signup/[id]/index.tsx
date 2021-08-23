import React, { useEffect, useState } from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
	findUserById,
	login,
	sendVerifyUser,
	signup
} from '../../../redux/users/users.slice';
import SVG from '../../../components/SVG';
import { useRouter } from 'next/router';

const index = () => {
	const router = useRouter();
	const { id } = router.query;
	const userId = typeof id === 'string' ? id : '';
	const dispatch = useAppDispatch();
	const {
		loading,
		alert: usersAlert,
		error: usersError,
		user,
		isAuth
	} = useAppSelector(state => state.users);
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
	const [passwordIsHidden, setPasswordIsHidden] = useState(true);

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		const isValid =
			target.id === 'name'
				? target.value.length && target.value.length < 30
				: target.id === 'email'
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
				signup({
					userName: name.value,
					email: email.value,
					password: password.value,
					id: userId
				})
			);
		}
	};

	useEffect(() => {
		// if signup is successful, send verification email
		if (usersAlert?.title === 'Success' && !isAuth && user?.email)
			dispatch(sendVerifyUser(email.value));
		// If id in url is invalid, redirect to /login
		if (usersError) router.push('/login');
	}, [usersAlert, usersError]);

	// Get user using id in url
	useEffect(() => {
		if (userId) {
			dispatch(findUserById(userId));
		}
	}, [userId]);

	return (
		<>
			<h1 className='title'>Sign Up</h1>
			<form onSubmit={submitHandler} className='box w-72 sm:w-80'>
				<Input
					placeholder='Name'
					type='text'
					value={name.value}
					onChange={changeHandler}
					id='name'
					isValid={name.isValid}
					helperText={
						!name.isValid && name.isTouched
							? 'Please enter a name under 30 characters'
							: ''
					}
					isTouched={name.isTouched}
					touchHandler={touchHandler}
					label='Name'
					containerClasses='mb-0.5 last:mb-0'
				/>
				<Input
					placeholder='Email'
					type='text'
					value={email.value}
					onChange={changeHandler}
					id='email'
					isValid={email.isValid}
					helperText={
						!email.isValid && email.isTouched
							? 'Please enter a valid email address'
							: ''
					}
					isTouched={email.isTouched}
					touchHandler={touchHandler}
					label='Email'
					containerClasses='mb-0.5 last:mb-0'
				/>
				<Input
					placeholder='Password'
					type={passwordIsHidden ? 'password' : 'text'}
					value={password.value}
					onChange={changeHandler}
					id='password'
					isValid={password.isValid}
					helperText={
						!password.isValid && password.isTouched
							? 'Password must be 6 or more characters'
							: ''
					}
					isTouched={password.isTouched}
					touchHandler={touchHandler}
					label='Password'
					passwordIsHidden={passwordIsHidden}
					endIcon={
						<SVG
							name={passwordIsHidden ? 'eyeOpen' : 'eyeClosed'}
							classes='fill-current text-gray cursor-pointer'
							onClick={() => setPasswordIsHidden(prev => !prev)}
						/>
					}
					containerClasses='mb-4'
				/>
				<Button
					label='Sign up'
					type='submit'
					size='large'
					fullWidth
					color='green'
					variant='contained'
					disabled={!formIsValid}
					onClick={buttonClickHandler}
					loading={loading}
					buttonClasses='p-2'
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
				<Button
					label='Take a tour'
					path='#'
					startIcon={<div className='w-5'></div>}
					endIcon={
						<div className='w-5 h-5'>
							<SVG name='map' classes='fill-current w-full' />
						</div>
					}
					type='link'
					fullWidth
					color='green-700'
					variant='simple'
					size='small'
					buttonClasses='mt-3 uppercase px-1 py-0.5 border-b shadow-sm'
				/>
			</form>
		</>
	);
};

export default index;
