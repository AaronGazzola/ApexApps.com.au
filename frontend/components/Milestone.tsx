import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Input from './Input';
import moment from 'moment';
import SVG from './SVG';
import Button from './Button';
import { addFeature } from '../redux/milestones/milestones.slice';

interface MilestoneProps {
	title: string;
	milestoneId: string;
	startDate?: Date;
	endDate?: Date;
	price?: number;
	currency?: string;
	notes?: string;
	buttonLabel?: string;
	buttonLink?: string;
	features?: [
		{
			_id: string;
			title: string;
			state: 'planned' | 'inProgress' | 'completed';
			steps: string[];
		}
	];
}

const Milestone = (props: MilestoneProps) => {
	const {
		title,
		startDate = new Date(),
		endDate = new Date(),
		price = 0,
		currency = 'USD',
		notes = '',
		buttonLabel = '',
		buttonLink = '',
		features = [],
		milestoneId
	} = props;
	const { user } = useAppSelector(state => state.users);
	const dispatch = useAppDispatch();
	let initialState = {
		[`title${milestoneId}`]: title ? title : '',
		[`startDate${milestoneId}`]: startDate ? startDate : new Date(),
		[`endDate${milestoneId}`]: endDate ? endDate : new Date(),
		[`price${milestoneId}`]: price ? Number(price) : 0,
		[`currency${milestoneId}`]: currency ? currency : 'USD',
		[`notes${milestoneId}`]: notes ? notes : '',
		[`buttonLabel${milestoneId}`]: buttonLabel ? buttonLabel : '',
		[`buttonLink${milestoneId}`]: buttonLink ? buttonLink : '',
		features
	};
	features.forEach(feature => {
		initialState = {
			...initialState,
			[`title${feature._id}`]: feature.title ? feature.title : ''
		};
	});

	const [state, setState] = useState(
		initialState as {
			[index: string]: any;
		}
	);

	const [openFeature, setOpenFeature] = useState(-1);

	const changeHandler = (
		e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setState({
			...state,
			[e.currentTarget.id]:
				e.currentTarget.id === `endDate${milestoneId}` ||
				e.currentTarget.id === `startDate${milestoneId}`
					? new Date(moment(e.currentTarget.value).toDate())
					: e.currentTarget.id === `price${milestoneId}`
					? Number(e.currentTarget.value)
					: e.currentTarget.value
		});
	};

	const addFeatureHandler = (index: number) => {
		dispatch(addFeature({ milestoneId, index }));
	};

	if (user?.isAdmin) {
		return (
			<div className='box w-72 sm:w-80'>
				<Input
					type='text'
					placeholder='Title'
					value={state[`title${milestoneId}`]}
					onChange={changeHandler}
					label='Title'
					id={`title${milestoneId}`}
					validation={false}
				/>
				<Input
					type='date'
					placeholder='Start date'
					value={moment(state[`startDate${milestoneId}`]).format('YYYY-MM-DD')}
					onChange={changeHandler}
					label='Start date'
					id={`startDate${milestoneId}`}
					validation={false}
				/>
				<Input
					type='date'
					placeholder='End date'
					value={moment(state[`endDate${milestoneId}`]).format('YYYY-MM-DD')}
					onChange={changeHandler}
					label='End date'
					id={`endDate${milestoneId}`}
					validation={false}
				/>
				<Input
					type='number'
					placeholder='Price'
					value={state[`endDate${milestoneId}`]}
					onChange={changeHandler}
					label='Price'
					id={`endDate${milestoneId}`}
					validation={false}
				/>
				<Input
					type='select'
					placeholder='Currency'
					value={state[`currency${milestoneId}`]}
					onChange={changeHandler}
					label='Currency'
					id={`currency${milestoneId}`}
					validation={false}
					options={['USD', 'AUD']}
				/>
				<Input
					type='textarea'
					placeholder='Notes'
					value={state[`notes${milestoneId}`]}
					onChange={changeHandler}
					label='Notes'
					id={`notes${milestoneId}`}
					validation={false}
					rows={3}
					maxLength={500}
				/>
				<Input
					type='text'
					placeholder='Button label'
					value={state[`buttonLabel${milestoneId}`]}
					onChange={changeHandler}
					label='Button label'
					id={`buttonLabel${milestoneId}`}
					validation={false}
				/>
				<Input
					type='text'
					placeholder='Button link'
					value={state[`buttonLink${milestoneId}`]}
					onChange={changeHandler}
					label='Button link'
					id={`buttonLink${milestoneId}`}
					validation={false}
				/>
				<Button
					type='button'
					size='large'
					variant='simple'
					color='green'
					onClick={() => addFeatureHandler(0)}
					endIcon={
						<div className='w-6 h-6'>
							<SVG name='add' classes='fill-current text-green w-full h-full' />
						</div>
					}
					buttonClasses='mt-2'
				/>
				{features?.map((feature, index) => (
					<React.Fragment key={feature._id}>
						<div
							className={`border rounded-lg w-full relative overflow-hidden px-3  mt-4
            ${
							openFeature === index
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
									openFeature === index
										? 'rotate-90 translate-y-1 text-blue-dark'
										: '-rotate-90'
								}`}
							/>
							<div
								className='absolute top-0 left-0 w-full h-8 cursor-pointer'
								onClick={() =>
									setOpenFeature(openFeature === index ? -1 : index)
								}
							></div>
							<p
								className={`font-semibold ${
									openFeature === index ? 'text-blue-dark' : 'text-gray-dark'
								} text-sm text-center mt-1 mb-2`}
							>
								Feature
							</p>
							<Input
								type='text'
								placeholder='Title'
								value={state[`title${feature._id}`]}
								onChange={changeHandler}
								label='Title'
								id={`title${feature._id}`}
								validation={false}
							/>
						</div>
						<Button
							type='button'
							size='large'
							variant='simple'
							color='green'
							onClick={() => addFeatureHandler(index)}
							endIcon={
								<div className='w-6 h-6'>
									<SVG
										name='add'
										classes='fill-current text-green w-full h-full'
									/>
								</div>
							}
							buttonClasses='mt-2'
						/>
					</React.Fragment>
				))}
			</div>
		);
	} else {
		return <div className='box w-72 sm:w-80'></div>;
	}
};

export default Milestone;
