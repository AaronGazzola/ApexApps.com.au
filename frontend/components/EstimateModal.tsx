import React, { SyntheticEvent, useState } from 'react';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Button from './Button';
import Input from './Input';
import { editEstimate } from '../redux/projects/projects.slice';

interface Data {
	startFrom: Date;
	startTo: Date;
	endFrom: Date;
	endTo: Date;
	costFrom: number;
	costTo: number;
}

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
		costTo: estimate?.costTo ? Number(estimate?.costTo) : 0
	} as { [index: string]: any });
	const { startFrom, startTo, endFrom, endTo, costFrom, costTo } = state;

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		if (e.currentTarget.id.startsWith('cost')) {
			setState({
				...state,
				[e.currentTarget.id]: e.currentTarget.value
			});
		} else {
			setState({
				...state,
				[e.currentTarget.id]: moment(e.currentTarget.value).toDate()
			});
		}
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
				costTo: Number(costTo)
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
