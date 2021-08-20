import React, { SyntheticEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { UpdateData } from '../redux/users/users.interface';
import { updateUser } from '../redux/users/users.slice';
import Button from './Button';
import Input from './Input';
import SVG from './SVG';

const EditProfileModal = () => {
	const dispatch = useAppDispatch();
	const { user, isAuth, loading } = useAppSelector(state => state.users);
	const [state, setState] = useState({
		name: {
			value: user?.userName || '',
			isValid: user?.userName ? user?.userName.length < 30 : false,
			isTouched: false,
			isChanged: false
		},
		email: {
			value: user?.newEmail || user?.email || '',
			isValid: user?.newEmail
				? /^\S+@\S+\.\S+$/.test(user?.newEmail)
				: user?.email
				? /^\S+@\S+\.\S+$/.test(user?.email)
				: false,
			isTouched: false,
			isChanged: false
		},
		currentPassword: {
			value: '',
			isValid: false,
			isTouched: false
		},
		newPassword: {
			value: '',
			isValid: false,
			isTouched: false
		}
	} as { [index: string]: any });
	const { name, email, currentPassword, newPassword } = state;
	const [passwordIsHidden, setPasswordIsHidden] = useState(true);
	const [passwordIsOpen, setPasswordIsOpen] = useState(false);
	const formIsValid = passwordIsOpen
		? (name.isChanged || email.isChanged) &&
		  name.isValid &&
		  email.isValid &&
		  currentPassword.isValid &&
		  newPassword.isValid
		: (name.isChanged || email.isChanged) && name.isValid && email.isValid;

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		const isValid =
			target.id === 'name'
				? target.value.length && target.value.length < 30
				: target.id === 'email'
				? /^\S+@\S+\.\S+$/.test(target.value)
				: target.value.length >= 6;
		const isChanged =
			target.id === 'name'
				? target.value !== user?.userName
				: user?.newEmail
				? target.value !== user?.newEmail
				: target.value !== user?.email;
		setState({
			...state,
			[target.id]: {
				...state[target.id],
				value: target.value,
				isValid,
				isChanged
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

	const submitUpdateProfileHandler = (e: SyntheticEvent) => {
		e.preventDefault();
		let formData: UpdateData = {
			userName: name.value,
			email: email.value
		};
		if (passwordIsOpen)
			formData = {
				...formData,
				currentPassword: currentPassword.value,
				newPassword: newPassword.value
			};

		if (formIsValid) dispatch(updateUser(formData));
	};
	return (
		<form
			onSubmit={submitUpdateProfileHandler}
			className='w-full flex flex-col items-center'
		>
			<h2 className='title-sm text-center'>Edit Profile</h2>
			<Input
				type='text'
				validation={name.isChanged}
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
					name.isChanged && !name.isValid && name.isTouched
						? 'Please enter a name below 30 characters'
						: ''
				}
			/>
			<Input
				type='text'
				validation={email.isChanged}
				isValid={email.isValid}
				placeholder='Email'
				value={email.value}
				label='Email'
				onChange={changeHandler}
				id='email'
				isTouched={email.isTouched}
				touchHandler={touchHandler}
				fullWidth
				helperText={
					user?.newEmail && !email.isChanged
						? 'Please check your inbox to verify this email'
						: !email.isValid && email.isTouched
						? 'Please enter a valid email address'
						: ''
				}
				inputClasses={
					user?.newEmail && !email.isChanged ? 'bg-blue-lightest' : ''
				}
				containerClasses='mt-1'
			/>
			<div
				className={`border rounded-lg w-full relative overflow-hidden px-3  mt-4
        ${
					passwordIsOpen
						? 'max-h-80 border-blue-darkest'
						: 'max-h-8 border-gray-light'
				}
        `}
				style={{
					transition: 'max-height .3s ease-out'
				}}
			>
				<SVG
					name='chevronLeft'
					classes={`absolute right-2 top-1 fill-current text-gray transform w-4 h-4 transition-transform duration-300 ease-in-out  ${
						passwordIsOpen
							? 'rotate-90 translate-y-1 text-blue-dark'
							: '-rotate-90'
					}`}
				/>
				<div
					className='absolute top-0 left-0 w-full h-8 cursor-pointer'
					onClick={() => setPasswordIsOpen(prev => !prev)}
				></div>
				<p
					className={`font-semibold ${
						passwordIsOpen ? 'text-blue-dark' : 'text-gray-dark'
					} text-sm text-center mt-1 mb-2`}
				>
					Change password
				</p>
				<Input
					placeholder='Current password'
					type={passwordIsHidden ? 'password' : 'text'}
					value={currentPassword.value}
					onChange={changeHandler}
					id='currentPassword'
					isValid={currentPassword.isValid}
					helperText={
						currentPassword.isTouched && !currentPassword.isValid
							? 'Password must be 6 or more characters'
							: ''
					}
					isTouched={currentPassword.isTouched}
					touchHandler={touchHandler}
					label='Current password'
					passwordIsHidden={passwordIsHidden}
					endIcon={
						<SVG
							name={passwordIsHidden ? 'eyeOpen' : 'eyeClosed'}
							classes='fill-current text-gray cursor-pointer'
							onClick={() => setPasswordIsHidden(prev => !prev)}
						/>
					}
					containerClasses='mt-2'
				/>
				<Input
					placeholder='New password'
					type={passwordIsHidden ? 'password' : 'text'}
					value={newPassword.value}
					onChange={changeHandler}
					id='newPassword'
					isValid={newPassword.isValid}
					helperText={
						newPassword.isTouched && !newPassword.isValid
							? 'Password must be 6 or more characters'
							: ''
					}
					isTouched={newPassword.isTouched}
					touchHandler={touchHandler}
					label='New password'
					passwordIsHidden={passwordIsHidden}
					endIcon={
						<SVG
							name={passwordIsHidden ? 'eyeOpen' : 'eyeClosed'}
							classes='fill-current text-gray cursor-pointer'
							onClick={() => setPasswordIsHidden(prev => !prev)}
						/>
					}
					containerClasses='mt-1 mb-2'
					labelTop
				/>
			</div>
			<Button
				variant='contained'
				type='submit'
				color='green'
				label='Update Profile'
				fullWidth
				disabled={!formIsValid}
				buttonClasses='p-2 mt-4'
				loading={loading}
			/>
		</form>
	);
};

export default EditProfileModal;
