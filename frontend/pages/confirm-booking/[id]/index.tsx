import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { confirmBooking } from '../../../redux/users/users.slice';

const Index = () => {
	const dispatch = useAppDispatch();
	const { success, loading } = useAppSelector(state => state.users);
	const router = useRouter();
	const { id } = router.query;
	const idQuery = typeof id === 'string' ? id : '';
	const [zoomLink, setZoomLink] = useState('');

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		setZoomLink(e.currentTarget.value);
	};

	const submitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (idQuery) dispatch(confirmBooking({ bookingId: idQuery, zoomLink }));
	};

	useEffect(() => {
		if (success === 'Booking confirmed') router.push('/project');
	}, [success, router]);

	return (
		<>
			<h1 className='title'>Confirm booking</h1>
			<form onSubmit={submitHandler} className='box w-full sm:max-w-xs'>
				<Input
					placeholder='Zoom link'
					type='text'
					value={zoomLink}
					onChange={changeHandler}
					id='zoomLink'
					label='Zoom link'
					containerClasses=''
					validation={false}
				/>

				<Button
					label='Confirm booking'
					type='submit'
					size='large'
					fullWidth
					color='green'
					variant='contained'
					disabled={false}
					loading={loading}
					buttonClasses='p-2 shadow-sm'
				/>
			</form>
		</>
	);
};

export default Index;
