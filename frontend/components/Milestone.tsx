import React, { useEffect, useRef, useState } from 'react';
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
import { Collapse } from '@material-ui/core';

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

	const milestoneState = features.every(
		feature => feature.state === 'Completed'
	)
		? 'Completed'
		: features.some(feature => feature.state === 'In progress')
		? 'In progress'
		: 'Planned';

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
				>
					<SVG
						name='close'
						classes={`absolute left-3 top-4 fill-current text-red w-8 h-8 z-10 cursor-pointer`}
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
						classes={`absolute right-4 top-3 fill-current text-gray-light transform w-7 h-7 transition-transform duration-300 ease-in-out  ${
							openMilestone === milestoneId
								? 'rotate-90 translate-y-2 text-blue-dark'
								: '-rotate-90'
						}`}
					/>
					<div
						className='absolute top-0 left-0 w-full h-14 cursor-pointer'
						onClick={() =>
							dispatch(
								setOpenMilestone(
									openMilestone === milestoneId ? '' : milestoneId
								)
							)
						}
					></div>
					<Collapse
						in={openMilestone === milestoneId}
						timeout='auto'
						collapsedSize={30}
					>
						<div className='flex flex-col items-center'>
							<h2
								className={`font-medium ${
									openMilestone === milestoneId
										? 'text-blue-dark'
										: 'text-gray-dark'
								} title-sm text-center mb-2 select-none`}
							>
								{title ? title : 'Milestone'}
							</h2>
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
								value={moment(state[`endDate${milestoneId}`]).format(
									'YYYY-MM-DD'
								)}
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
								if (!state[`title${feature._id}`]) {
									return <React.Fragment key={index}></React.Fragment>;
								} else {
									return (
										<React.Fragment key={feature._id}>
											<div
												className={`border rounded-lg w-full relative overflow-hidden px-3  mt-4 flex flex-col items-center
												${openFeature === feature._id ? 'border-blue-darkest' : 'border-gray-light'}
												`}
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
												<Collapse
													in={openFeature === feature._id}
													timeout='auto'
													collapsedSize={30}
												>
													<div className='flex flex-col items-center pb-2'>
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
																return (
																	<React.Fragment key={index}></React.Fragment>
																);
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
												</Collapse>
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
						</div>
					</Collapse>
				</form>
			</React.Fragment>
		);
	} else {
		return (
			<div className='box w-72 sm:w-80 relative' key={milestoneId}>
				<SVG
					name='chevronLeft'
					classes={`absolute w-7 h-7 right-4 top-3 fill-current text-gray-light transform w-4 h-4 transition-transform duration-300 ease-in-out  ${
						openMilestone === milestoneId
							? 'rotate-90 translate-y-2 text-blue-dark'
							: '-rotate-90'
					}`}
				/>
				<div
					className='absolute top-0 left-0 h-16 w-full cursor-pointer'
					onClick={() =>
						dispatch(
							setOpenMilestone(openMilestone === milestoneId ? '' : milestoneId)
						)
					}
				></div>
				<h2 className='title-sm'>{title}</h2>
				<Collapse
					in={openMilestone === milestoneId}
					timeout='auto'
					collapsedSize={0}
					style={{ width: '100%' }}
				>
					<div className='flex flex-col w-full mt-4'>
						<div className='flex justify-between'>
							<p>
								<span className='font-semibold text-gray-dark'>Start: </span>
								{moment(startDate).format('D-MMM-YY')}
							</p>
							<p>
								<span className='font-semibold text-gray-dark'>End: </span>
								{moment(endDate).format('D-MMM-YY')}
							</p>
						</div>
						<div className='flex items-end justify-between mt-0.5'>
							{milestoneState === 'Completed' ? (
								<div className='rounded-full bg-green flex flex-nowrap px-1 py-0.5 items-center'>
									<SVG
										name='checkMark'
										classes='fill-current text-white h-5 w-5'
									/>
									<p className='font-bold text-white text-xs pr-1 '>
										Completed
									</p>
								</div>
							) : milestoneState === 'In progress' ? (
								<div className='rounded-full bg-blue-darkest flex flex-nowrap px-1 py-0.5 items-center'>
									<SVG
										name='pulse'
										classes='fill-current text-white h-4 w-4 mx-0.5 sm:w-5 sm:h-5'
									/>
									<p className='font-bold text-white text-xs pr-1 whitespace-nowrap'>
										In Progress
									</p>
								</div>
							) : (
								<div className='rounded-full border-2 border-gray-dark flex flex-nowrap pl-0.5 pr-1  items-center mt-1'>
									<SVG
										name='lightBulb'
										classes='fill-current text-gray-dark h-4 w-4 sm:w-5 sm:h-5'
									/>
									<p className='font-bold text-gray-dark text-xs pr-1 '>
										Planned
									</p>
								</div>
							)}
							{price ? (
								<p>
									<span className='font-semibold text-gray-dark'>Price: </span>$
									{price.toLocaleString('en-US')}
									<span className='text-xxs font-semibold'>{currency}</span>
								</p>
							) : (
								<div></div>
							)}
						</div>
					</div>
					{features.map((feature, index) => (
						<div
							key={feature._id}
							className={`border rounded-lg w-full relative overflow-hidden px-3  mt-4 flex flex-col 
						${
							feature.state === 'Completed'
								? 'border-green'
								: feature.state === 'In progress'
								? 'border-blue-darkest'
								: 'border-gray-dark'
						}`}
						>
							<div
								className={`flex items-center py-2 cursor-pointer
							`}
								onClick={() =>
									dispatch(
										setOpenFeature(
											openFeature === feature._id ? '' : feature._id
										)
									)
								}
							>
								<div
									className={`rounded-full h-5 w-5 mr-2 ${
										feature.state === 'Completed'
											? 'bg-green'
											: feature.state === 'In progress'
											? 'bg-blue-darkest'
											: 'bg-gray'
									}`}
								>
									{feature.state === 'Completed' ? (
										<SVG
											name='checkMark'
											classes='fill-current text-white h-5 w-5'
										/>
									) : feature.state === 'In progress' ? (
										<SVG
											name='pulse'
											classes='fill-current text-white w-4 h-4 mt-0.5 ml-0.5'
										/>
									) : (
										<SVG
											name='lightBulbFill'
											classes='fill-current text-white h-4 w-4 mt-0.5 ml-0.5'
										/>
									)}
								</div>
								<h3 className='font-semibold text-gray-dark mt-0.5'>
									{feature.title}
								</h3>

								<SVG
									name='chevronLeft'
									classes={`absolute w-6 h-6 right-3 top-1 fill-current text-gray-light transform w-4 h-4 transition-transform duration-300 ease-in-out  ${
										openFeature === feature._id
											? 'rotate-90 translate-y-2 text-blue-dark'
											: '-rotate-90'
									}`}
								/>
							</div>
							<Collapse
								in={openFeature === feature._id}
								timeout='auto'
								collapsedSize={0}
							>
								<ol className='mb-2'>
									{feature.steps.map(step => (
										<li key={step._id} className='flex items-center'>
											<div className='rounded-full bg-black w-1 h-1 mr-2 ml-2'></div>
											<p className='font-medium text-sm'>{step.content}</p>
										</li>
									))}
								</ol>
							</Collapse>
						</div>
					))}
					{notes && (
						<div className='border rounded-md border-gray mt-4 py-2 px-4 w-full'>
							<p className='font-semibold text-gray-dark'>Notes:</p>
							<p>{notes}</p>
						</div>
					)}
					{buttonLink && buttonLabel && (
						<a
							target='_blank'
							rel='noopener noreferrer'
							href={buttonLink}
							className='w-full'
						>
							<Button
								label={buttonLabel}
								type='button'
								fullWidth
								color='green'
								variant='contained'
								disabled={false}
								buttonClasses='p-1 shadow-sm mt-4'
							/>
						</a>
					)}
				</Collapse>
			</div>
		);
	}
};

export default Milestone;
