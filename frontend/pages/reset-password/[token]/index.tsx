import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Meta from '../../../components/Meta';
import SVG from '../../../components/SVG';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { resetPassword } from '../../../redux/users/users.slice';

const Index = () => {
	const dispatch = useAppDispatch();
	const { success, error, alert, loading } = useAppSelector(
		state => state.users
	);
	const router = useRouter();
	const { token } = router.query;
	const tokenQuery = typeof token === 'string' ? token : '';

	const [password, setPassword] = useState({
		value: '',
		isValid: false,
		isTouched: false
	});
	const [passwordIsHidden, setPasswordIsHidden] = useState(true);

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		const isValid = target.value.length >= 6 && target.value.length <= 20;
		setPassword({ ...password, value: target.value, isValid });
	};

	const touchHandler = (e: React.FocusEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		setPassword({ ...password, isTouched: true });
	};

	const buttonClickHandler = (e: React.MouseEvent) => {
		if (!password.isValid) {
			setPassword({ ...password, isTouched: true });
		}
	};

	const submitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (password.isValid) {
			dispatch(
				resetPassword({
					token: tokenQuery,
					password: password.value
				})
			);
		}
	};

	useEffect(() => {
		if (success === 'Password reset') router.push('/project');
	}, [success, router]);

	return (
		<>
			<Meta title='Reset password | Apex Apps' />
			<h1 className='title'>Reset Password</h1>
			<form onSubmit={submitHandler} className='box w-72 sm:w-80'>
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
					label='Reset Password'
					type='submit'
					size='large'
					fullWidth
					color='green'
					variant='contained'
					disabled={!password.isValid}
					onClick={buttonClickHandler}
					loading={loading}
					buttonClasses='p-2'
				/>
			</form>
		</>
	);
};

export default Index;
