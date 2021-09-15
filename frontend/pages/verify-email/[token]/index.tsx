import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { verifyEmail } from '../../../redux/users/users.slice';

const Index = () => {
	const dispatch = useAppDispatch();
	const { success: usersSuccess } = useAppSelector(state => state.users);
	const router = useRouter();
	const { token } = router.query;
	const tokenQuery = typeof token === 'string' ? token : '';

	useEffect(() => {
		if (tokenQuery) dispatch(verifyEmail(tokenQuery));
	}, [tokenQuery, dispatch]);

	useEffect(() => {
		if (usersSuccess === 'Email updated') router.push('/project');
	}, [usersSuccess, router]);

	return (
		<>
			<h1 className='title'>Updating your email address</h1>
			<div className='flex w-full justify-center'>
				<div
					className='w-14 h-14 border-t-2 border-l-2 border-blue-darkest animate-spin'
					style={{ borderRadius: '50%' }}
				></div>
			</div>
		</>
	);
};

export default Index;
