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
	const [passwordIsHidden, setPasswordIsHidden] = useState(true);

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		const isValid =
			target.id === 'name'
				? target.value.length && target.value.length < 30
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
					placeholder='Name'
					type='text'
					value={formState.name.value}
					changeHandler={changeHandler}
					id='name'
					isValid={formState.name.isValid}
					helperText='Please enter a name under 30 characters'
					isTouched={formState.name.isTouched}
					touchHandler={touchHandler}
					label='Name'
				/>
				<Input
					placeholder='Email'
					type='text'
					value={formState.email.value}
					changeHandler={changeHandler}
					id='email'
					isValid={formState.email.isValid}
					helperText='Please enter a valid email address'
					isTouched={formState.email.isTouched}
					touchHandler={touchHandler}
					label='Email'
				/>
				<Input
					placeholder='Password'
					type={passwordIsHidden ? 'password' : 'text'}
					value={formState.password.value}
					changeHandler={changeHandler}
					id='password'
					isValid={formState.password.isValid}
					helperText='Password must be 6 or more characters'
					isTouched={formState.password.isTouched}
					touchHandler={touchHandler}
					label='Password'
					passwordIsHidden={passwordIsHidden}
					endIcon={
						<SVG
							name={passwordIsHidden ? 'eyeOpen' : 'eyeClosed'}
							className='fill-current text-gray cursor-pointer'
							onClick={() => setPasswordIsHidden(prev => !prev)}
						/>
					}
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
					classes='p-2'
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
