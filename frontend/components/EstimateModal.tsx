import React, { SyntheticEvent, useState } from 'react';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Button from './Button';
import Input from './Input';
import { editEstimate } from '../redux/projects/projects.slice';

const EsimateModal = () => {
	const dispatch = useAppDispatch();
	const { project, loading } = useAppSelector(state => state.projects);
	const estimate = project?.estimate;
	const [state, setState] = useState({
		startFrom: estimate?.startFrom ? new Date(estimate?.startFrom) : new Date(),
		startTo: estimate?.startTo ? new Date(estimate?.startTo) : new Date(),
		endFrom: estimate?.endFrom ? new Date(estimate?.endFrom) : new Date(),
		endTo: estimate?.endTo ? new Date(estimate?.endTo) : new Date(),
		costFrom: estimate?.costFrom ? Number(estimate?.costFrom) : 0,
		costTo: estimate?.costTo ? Number(estimate?.costTo) : 0,
		currency: 'USD'
	} as { [index: string]: any });
	const { startFrom, startTo, endFrom, endTo, costFrom, costTo, currency } =
		state;

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		let value: string | Date = e.currentTarget.value;
		if (
			!e.currentTarget.id.startsWith('cost') &&
			e.currentTarget.id !== 'currency'
		)
			value = moment(e.currentTarget.value).toDate();
		setState({
			...state,
			[e.currentTarget.id]: value
		});
	};

	const submitHandler = (e: SyntheticEvent) => {
		e.preventDefault();
		dispatch(
			editEstimate({
				startFrom: moment(startFrom).toString(),
				startTo: moment(startTo).toString(),
				endFrom: moment(endFrom).toString(),
				endTo: moment(endTo).toString(),
				costFrom: Number(costFrom),
				costTo: Number(costTo),
				currency
			})
		);
	};
	return (
		<form
			onSubmit={submitHandler}
			className='w-full flex flex-col items-center'
		>
			<h2 className='title-sm text-center'>Edit Estimate</h2>
			<Input
				type='date'
				placeholder='Start From'
				value={moment(startFrom).format('YYYY-MM-DD')}
				label='Start from'
				onChange={changeHandler}
				id='startFrom'
				fullWidth
				validation={false}
			/>
			<Input
				type='date'
				placeholder='Start To'
				value={moment(startTo).format('YYYY-MM-DD')}
				label='Start to'
				onChange={changeHandler}
				id='startTo'
				fullWidth
				validation={false}
			/>
			<Input
				type='date'
				placeholder='End From'
				value={moment(endFrom).format('YYYY-MM-DD')}
				label='End from'
				onChange={changeHandler}
				id='endFrom'
				fullWidth
				validation={false}
			/>
			<Input
				type='date'
				placeholder='End To'
				value={moment(endTo).format('YYYY-MM-DD')}
				label='End to'
				onChange={changeHandler}
				id='endTo'
				fullWidth
				validation={false}
			/>
			<Input
				type='number'
				placeholder='Cost from'
				value={costFrom}
				label='Cost from'
				onChange={changeHandler}
				id='costFrom'
				fullWidth
				validation={false}
				inputClasses='no-spin'
			/>
			<Input
				type='number'
				placeholder='Cost to'
				value={costTo}
				label='Cost to'
				onChange={changeHandler}
				id='costTo'
				fullWidth
				validation={false}
				inputClasses='no-spin'
			/>
			<Input
				type='select'
				options={['USD', 'AUD']}
				placeholder='Currency'
				value={currency}
				label='Currency'
				onChange={changeHandler}
				id='currency'
				fullWidth
				validation={false}
			/>
			<Button
				variant='contained'
				type='submit'
				color='green'
				label='Update Estimate'
				fullWidth
				buttonClasses='p-2 mt-4'
				loading={loading}
			/>
		</form>
	);
};

export default EsimateModal;
