import moment from 'moment';
import React, { SyntheticEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addUpdate, editUpdate } from '../redux/milestones/milestones.slice';
import Button from './Button';
import Input from './Input';

interface UpdateModalProps {
	date?: Date | string;
	notes?: string;
	id: string;
	type: 'add' | 'edit';
	buttonLink?: string;
	buttonLabel?: string;
	publish?: boolean;
}

const UpdateModal = (props: UpdateModalProps) => {
	const {
		date: updateDate = new Date(),
		notes: updateNotes = '',
		buttonLink: link = '',
		buttonLabel: label = '',
		publish: updatePublished = false,
		type,
		id
	} = props;
	const dispatch = useAppDispatch();
	const { loading } = useAppSelector(state => state.milestones);
	const [state, setState] = useState({
		date: updateDate,
		notes: updateNotes,
		buttonLink: link,
		buttonLabel: label,
		publish: updatePublished
	} as { [index: string]: any });
	const { date, notes, buttonLink, buttonLabel, publish } = state;

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		const value =
			target.id === 'date'
				? new Date(moment(e.currentTarget.value).toDate())
				: target.id === 'publish'
				? target.checked
				: target.value;
		setState({
			...state,
			[target.id]: value
		});
	};

	const submitHandler = (e: SyntheticEvent) => {
		e.preventDefault();
		const update = {
			date,
			notes,
			buttonLink,
			buttonLabel,
			publish,
			id
		};
		if (type == 'add') {
			dispatch(addUpdate(update));
		} else {
			dispatch(editUpdate(update));
		}
	};

	return (
		<form
			onSubmit={submitHandler}
			className='w-full flex flex-col items-center'
		>
			<h2 className='title-sm text-center'>
				{type === 'edit' ? 'Edit' : 'Add'} Update
			</h2>
			<Input
				type='date'
				placeholder='Date'
				value={moment(date).format('YYYY-MM-DD')}
				label='Date'
				onChange={changeHandler}
				id='date'
				fullWidth
				validation={false}
			/>
			<Input
				type='textarea'
				validation={false}
				placeholder='Notes'
				value={notes}
				label='Notes'
				onChange={changeHandler}
				id='notes'
				fullWidth
				rows={5}
				maxLength={500}
			/>
			<Input
				type='text'
				validation={false}
				placeholder='Button link'
				value={buttonLink}
				label='Button link'
				onChange={changeHandler}
				id='buttonLink'
				fullWidth
			/>
			<Input
				type='text'
				validation={false}
				placeholder='Button label'
				value={buttonLabel}
				label='Button label'
				onChange={changeHandler}
				id='buttonLabel'
				fullWidth
			/>
			<div className='flex justify-center mt-4'>
				<Input
					value={publish}
					onChange={changeHandler}
					label='Publish'
					type='checkbox'
					id='publish'
					fullWidth
					inputClasses=''
					labelTop
					validation={false}
				/>
			</div>
			<Button
				variant='contained'
				type='submit'
				color='green'
				label={`${type === 'add' ? 'Add' : 'Edit'} Update`}
				fullWidth
				buttonClasses='p-2 mt-5'
				loading={loading}
			/>
		</form>
	);
};

export default UpdateModal;
