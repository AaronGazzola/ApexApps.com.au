import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { confirmBooking } from '../../../redux/users/users.slice';

const Index = () => {
	const dispatch = useAppDispatch();
	const { success, error, alert } = useAppSelector(state => state.users);
	const router = useRouter();
	const { id } = router.query;
	const idQuery = typeof id === 'string' ? id : '';

	useEffect(() => {
		if (idQuery) dispatch(confirmBooking(idQuery));
	}, [idQuery, dispatch]);

	useEffect(() => {
		if (success === 'Booking confirmed') router.push('/project');
	}, [success, router]);

	return (
		<>
			<h1 className='title'>Confirming booking</h1>
			{!success && !error && !alert && (
				<div className='flex w-full justify-center mt-5'>
					<div
						className='w-14 h-14 border-t-2 border-l-2 border-blue-darkest animate-spin'
						style={{ borderRadius: '50%' }}
					></div>
				</div>
			)}
		</>
	);
};

export default Index;
