import React, { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Input from './Input';
import moment from 'moment';
import SVG from './SVG';
import Button from './Button';
import {
	addFeature,
	addStep,
	deleteFeature,
	deleteMilestone,
	deleteStep,
	editMilestone,
	setOpenFeature,
	setOpenMilestone
} from '../redux/milestones/milestones.slice';
import ConfirmModal from './ConfirmModal';
import { Feature } from '../redux/milestones/milestones.interface';

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
	features?: Feature[];
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
	const { openFeature, openMilestone, loading, feature, step } = useAppSelector(
		state => state.milestones
	);
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
			[`title${feature._id}`]: feature.title ? feature.title : '',
			[`featureState${feature._id}`]: feature.state ? feature.state : 'Planned'
		};
		feature.steps.forEach((step, index) => {
			initialState = {
				...initialState,
				[`step${step._id}`]: step.content
			};
		});
	});

	const [state, setState] = useState(
		initialState as {
			[index: string]: any;
		}
	);

	const [modalState, setModalState] = useState({
		isOpen: false,
		type: '',
		id: '',
		content: ''
	});

	const changeHandler = (
		e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const value =
			e.currentTarget.id === `endDate${milestoneId}` ||
			e.currentTarget.id === `startDate${milestoneId}`
				? new Date(moment(e.currentTarget.value).toDate())
				: e.currentTarget.id === `price${milestoneId}`
				? Number(e.currentTarget.value)
				: e.currentTarget.value;
		setState({
			...state,
			[e.currentTarget.id]: value
		});
	};

	const addFeatureHandler = (index: number) => {
		dispatch(addFeature({ milestoneId, index }));
	};

	const addStepHandler = (featureId: string, index: number) => {
		dispatch(addStep({ featureId, index }));
	};

	const submitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const submitFeatures = features.map(feature => {
			let featureState: 'Planned' | 'In progress' | 'Completed' =
				state[`featureState${feature._id}`];

			return {
				_id: feature._id,
				title: `${state[`title${feature._id}`]}`,
				state: featureState,
				steps: feature.steps.map((step, index) => ({
					_id: step._id,
					content: `${state[`step${step._id}`]}`
				}))
			};
		});
		dispatch(
			editMilestone({
				_id: milestoneId,
				title: state[`title${milestoneId}`],
				startDate: state[`startDate${milestoneId}`],
				endDate: state[`endDate${milestoneId}`],
				price: state[`price${milestoneId}`],
				currency: state[`currency${milestoneId}`],
				notes: state[`notes${milestoneId}`],
				buttonLabel: state[`buttonLabel${milestoneId}`],
				buttonLink: state[`buttonLink${milestoneId}`],
				features: submitFeatures
			})
		);
	};

	const renderModalContent = (modalType: string) => {
		switch (modalType) {
			case 'deleteMilestone':
				return (
					<ConfirmModal
						confirmFunction={() => dispatch(deleteMilestone(milestoneId))}
						cancelFunction={() =>
							setModalState({ ...modalState, isOpen: false })
						}
						type='delete'
						content={modalState.content}
					/>
				);
			case 'deleteFeature':
				return (
					<ConfirmModal
						confirmFunction={() => dispatch(deleteFeature(modalState.id))}
						cancelFunction={() =>
							setModalState({ ...modalState, isOpen: false })
						}
						type='delete'
						content={modalState.content}
					/>
				);
			case 'deleteStep':
				return (
					<ConfirmModal
						confirmFunction={() => dispatch(deleteStep(modalState.id))}
						cancelFunction={() =>
							setModalState({ ...modalState, isOpen: false })
						}
						type='delete'
						content={modalState.content}
					/>
				);
			default:
				return <></>;
		}
	};

	// when feature or step is added, add to state
	useEffect(() => {
		const foundFeature = Object.keys(state).find(
			x => x === `title${feature?._id}`
		);
		if (!foundFeature)
			setState({
				...state,
				[`title${feature?._id}`]: feature?.title,
				[`featureState${feature?._id}`]: feature?.state
			});
		const foundStep = Object.keys(state).find(x => x === `step${step?._id}`);
		if (!foundStep)
			setState({
				...state,
				[`step${step?._id}`]: step?.content
			});
	}, [feature, step]);

	if (user?.isAdmin) {
		return (
			<React.Fragment key={milestoneId}>
				<Modal
					isOpen={modalState.isOpen}
					onClose={() => setModalState({ ...modalState, isOpen: false })}
				>
					{renderModalContent(modalState.type)}
				</Modal>
				<form
					onSubmit={submitHandler}
					className={` box w-72 sm:w-80 relative overflow-hidden px-3  mt-4 flex flex-col items-center
            `}
					style={{
						transition: 'max-height .3s ease-out',
						maxHeight: openMilestone === milestoneId ? 10000 : 32
					}}
				>
					<SVG
						name='close'
						classes={`absolute left-2 top-1 fill-current text-red w-7 h-7 z-10 cursor-pointer`}
						onClick={() =>
							setModalState({
								isOpen: true,
								type: 'deleteMilestone',
								id: milestoneId,
								content: state[`title${milestoneId}`]
							})
						}
					/>
					<SVG
						name='chevronLeft'
						classes={`absolute right-2 top-1 fill-current text-gray transform w-4 h-4 transition-transform duration-300 ease-in-out  ${
							openMilestone === milestoneId
								? 'rotate-90 translate-y-1 text-blue-dark'
								: '-rotate-90'
						}`}
					/>
					<div
						className='absolute top-0 left-0 w-full h-8 cursor-pointer'
						onClick={() =>
							dispatch(
								setOpenMilestone(
									openMilestone === milestoneId ? '' : milestoneId
								)
							)
						}
					></div>
					<p
						className={`font-semibold ${
							openMilestone === milestoneId
								? 'text-blue-dark'
								: 'text-gray-dark'
						} text-sm text-center -mt-2 mb-2`}
					>
						{title ? title : 'Milestone'}
					</p>
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
						value={moment(state[`startDate${milestoneId}`]).format(
							'YYYY-MM-DD'
						)}
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
						value={state[`price${milestoneId}`]}
						onChange={changeHandler}
						label='Price'
						id={`price${milestoneId}`}
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
								<SVG
									name='add'
									classes='fill-current text-green w-full h-full'
								/>
							</div>
						}
						buttonClasses='mt-2'
					/>
					{features?.map((feature, index) => {
						console.log(feature);
						if (!state[`title${feature._id}`]) {
							return <React.Fragment key={index}></React.Fragment>;
						} else {
							return (
								<React.Fragment key={feature._id}>
									<div
										className={`border rounded-lg w-full relative overflow-hidden px-3  mt-4 flex flex-col items-center
            ${
							openFeature === feature._id
								? 'border-blue-darkest'
								: 'border-gray-light'
						}
            `}
										style={{
											transition: 'max-height .3s ease-out',
											maxHeight: openFeature === feature._id ? 10000 : 32
										}}
									>
										<SVG
											name='close'
											classes={`absolute left-0.5 top-0.5 fill-current text-red w-7 h-7 z-10 cursor-pointer`}
											onClick={() =>
												setModalState({
													isOpen: true,
													type: 'deleteFeature',
													id: feature._id,
													content: state[`title${feature._id}`]
												})
											}
										/>
										<SVG
											name='chevronLeft'
											classes={`absolute right-2 top-1 fill-current text-gray transform w-4 h-4 transition-transform duration-300 ease-in-out  ${
												openFeature === feature._id
													? 'rotate-90 translate-y-1 text-blue-dark'
													: '-rotate-90'
											}`}
										/>
										<div
											className='absolute top-0 left-0 w-full h-8 cursor-pointer'
											onClick={() =>
												dispatch(
													setOpenFeature(
														openFeature === feature._id ? '' : feature._id
													)
												)
											}
										></div>
										<p
											className={`font-semibold ${
												openFeature === feature._id
													? 'text-blue-dark'
													: 'text-gray-dark'
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
										<Input
											type='select'
											placeholder='State'
											value={state[`featureState${feature._id}`]}
											onChange={changeHandler}
											label='State'
											id={`featureState${feature._id}`}
											validation={false}
											options={['Planned', 'In progress', 'Completed']}
										/>
										<Button
											type='button'
											size='large'
											variant='simple'
											color='green'
											onClick={() => addStepHandler(feature._id, 0)}
											endIcon={
												<div className='w-6 h-6'>
													<SVG
														name='add'
														classes='fill-current text-green w-full h-full'
													/>
												</div>
											}
											buttonClasses='mt-4'
										/>
										{feature.steps.map((step, index) => {
											if (!state[`step${step._id}`]) {
												return <React.Fragment key={index}></React.Fragment>;
											} else {
												return (
													<React.Fragment key={step._id}>
														<div className='flex flex-nowrap items-center w-full'>
															<Input
																type='textarea'
																placeholder={`Step ${index + 1}`}
																value={state[`step${step._id}`]}
																onChange={changeHandler}
																label={`Step ${index + 1}`}
																id={`step${step._id}`}
																validation={false}
																rows={1}
															/>
															<SVG
																name='close'
																classes={`fill-current text-red w-7 h-7 z-10 cursor-pointer mt-5 -mr-3`}
																onClick={() =>
																	setModalState({
																		isOpen: true,
																		type: 'deleteStep',
																		id: step._id,
																		content: state[`step${step._id}`]
																	})
																}
															/>
														</div>
														<Button
															type='button'
															size='large'
															variant='simple'
															color='green'
															onClick={() =>
																addStepHandler(feature._id, index + 1)
															}
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
												);
											}
										})}
									</div>
									<Button
										type='button'
										size='large'
										variant='simple'
										color='green'
										onClick={() => addFeatureHandler(index + 1)}
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
							);
						}
					})}
					<Button
						label='Save changes'
						type='submit'
						size='large'
						fullWidth
						color='green'
						variant='contained'
						disabled={false}
						loading={loading}
						buttonClasses='p-2 shadow-sm mt-2'
					/>
				</form>
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment key={milestoneId}>
				<div className='flex justify-between'>
					<div>
						<div className='rounded-full bg-gray-dark w-4 h-4'></div>
						<p className='font-semibold text-gray-dark'>Planned</p>
					</div>
				</div>
				<div className='box w-72 sm:w-80'></div>
			</React.Fragment>
		);
	}
};

export default Milestone;
