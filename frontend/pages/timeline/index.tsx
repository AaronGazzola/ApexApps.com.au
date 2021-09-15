import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Meta from '../../components/Meta';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
	deleteUpdate,
	getMilestones,
	setOpenUpdate
} from '../../redux/milestones/milestones.slice';
import SVG from '../../components/SVG';
import { Milestone, Update } from '../../redux/milestones/milestones.interface';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import UpdateModal from '../../components/UpdateModal';
import ConfirmModal from '../../components/ConfirmModal';
import { Collapse } from '@material-ui/core';

const Index = () => {
	const dispatch = useAppDispatch();
	const { milestones, loading, openUpdate } = useAppSelector(
		state => state.milestones
	);
	const { isAuth, user, onTour, userView } = useAppSelector(
		state => state.users
	);
	const [modalState, setModalState] = useState({
		isOpen: false,
		type: '',
		id: '',
		date: new Date(),
		notes: '',
		buttonLink: '',
		buttonLabel: '',
		publish: false
	});

	const renderModalContent = (modalType: string) => {
		switch (modalType) {
			case 'addUpdate':
				return <UpdateModal type='add' id={modalState.id} />;
			case 'editUpdate':
				return (
					<UpdateModal
						type='edit'
						date={modalState.date}
						notes={modalState.notes}
						buttonLink={modalState.buttonLink}
						buttonLabel={modalState.buttonLabel}
						publish={modalState.publish}
						id={modalState.id}
					/>
				);
			case 'deleteUpdate':
				return (
					<ConfirmModal
						type='delete'
						content={`Update ${moment(modalState.date).format('DD-Mo-YY')}`}
						confirmFunction={() => dispatch(deleteUpdate(modalState.id))}
						cancelFunction={() =>
							setModalState({ ...modalState, isOpen: false })
						}
					/>
				);
			default:
				return <></>;
		}
	};

	useEffect(() => {
		if (isAuth && !onTour) dispatch(getMilestones());
	}, [isAuth, dispatch, onTour]);

	let sortedMilestones: Milestone[] = [];
	if (milestones?.length) {
		sortedMilestones = [...milestones];
		sortedMilestones.sort(
			(a, b) => moment(a.startDate).unix() - moment(b.startDate).unix()
		);
	}

	return (
		<>
			<Modal
				isOpen={modalState.isOpen}
				onClose={() => setModalState({ ...modalState, isOpen: false })}
			>
				{renderModalContent(modalState.type)}
			</Modal>
			<Meta title='Timeline | Apex Apps' />
			<h1 className='title'>Timeline</h1>
			{loading || !milestones ? (
				<>
					<div className='relative w-full max-w-sm'>
						<div
							className={`w-1 absolute top-8 left-3 bottom-11 skeleton`}
						></div>
						<div className={`absolute h-1 top-4 left-7 w-6 skeleton`}></div>
						<div className={`absolute h-1 bottom-8 left-7 w-6 skeleton`}></div>
						<div
							className={`rounded-full h-7 w-7 mr-2 absolute bottom-5 left-0 skeleton`}
						></div>
						<div
							className={`rounded-full h-7 w-7 mr-2 absolute top-1 left-0 skeleton`}
						></div>
						<div className='flex flex-col w-full pl-10'>
							<div className='box z-10 p-2 w-full'>
								<div className='w-40 h-5 skeleton mb-2'></div>
								<div className='w-32 h-4 skeleton'></div>
							</div>
							<div className='box z-10 p-2 w-full'>
								<div className='w-32 h-4 skeleton'></div>
							</div>
							<div className='box z-10 p-2 w-full'>
								<div className='w-32 h-4 skeleton'></div>
							</div>
						</div>
					</div>
					<div className='relative w-full max-w-sm'>
						<div
							className={`w-1 absolute top-8 left-3 bottom-11 skeleton`}
						></div>
						<div className={`absolute h-1 top-4 left-7 w-6 skeleton`}></div>
						<div className={`absolute h-1 bottom-8 left-7 w-6 skeleton`}></div>
						<div
							className={`rounded-full h-7 w-7 mr-2 absolute bottom-5 left-0 skeleton`}
						></div>
						<div
							className={`rounded-full h-7 w-7 mr-2 absolute top-1 left-0 skeleton`}
						></div>
						<div className='flex flex-col w-full pl-10'>
							<div className='box z-10 p-2 w-full'>
								<div className='w-40 h-5 skeleton mb-2'></div>
								<div className='w-32 h-4 skeleton'></div>
							</div>
							<div className='box z-10 p-2 w-full'>
								<div className='w-32 h-4 skeleton'></div>
							</div>
						</div>
					</div>
				</>
			) : milestones && !milestones.length ? (
				<div className='text-box'>
					<p className='box-text'>No milestones for timeline to display</p>
				</div>
			) : (
				<>
					{sortedMilestones?.map((milestone, index) => {
						const milestoneState = milestone?.features?.every(
							feature => feature.state === 'Completed'
						)
							? 'Completed'
							: milestone?.features?.some(
									feature => feature.state === 'In progress'
							  )
							? 'In progress'
							: 'Planned';
						let sortedUpdates: Update[] = [];
						if (milestone?.updates?.length)
							sortedUpdates = [...milestone.updates].sort(
								(a, b) => moment(b.date).unix() - moment(b.date).unix()
							);

						return (
							<div className='relative w-full max-w-sm' key={milestone._id}>
								<div
									className={`w-1 absolute top-4 left-3 bottom-8 ${
										milestoneState === 'Completed'
											? 'bg-green'
											: milestoneState === 'In progress'
											? 'bg-blue-darkest'
											: 'bg-gray'
									}`}
								></div>
								<div
									className={`absolute h-1 top-4 left-3 w-10 ${
										milestoneState === 'Completed'
											? 'bg-green'
											: milestoneState === 'In progress'
											? 'bg-blue-darkest'
											: 'bg-gray'
									}	`}
								></div>
								<div
									className={`absolute h-1 bottom-8 left-3 w-10 ${
										milestoneState === 'Completed'
											? 'bg-green'
											: milestoneState === 'In progress'
											? 'bg-blue-darkest'
											: 'bg-gray'
									}`}
								></div>
								<div
									className={`rounded-full h-7 w-7 mr-2 z-10 absolute bottom-5 left-0 ${
										milestoneState === 'Completed'
											? 'bg-green'
											: milestoneState === 'In progress'
											? 'bg-blue-darkest'
											: 'bg-gray'
									}`}
								>
									{milestoneState === 'Completed' ? (
										<SVG
											name='checkMark'
											classes='fill-current text-white h-7 w-7'
										/>
									) : milestoneState === 'In progress' ? (
										<SVG
											name='pulse'
											classes='fill-current text-white w-5 h-5 mt-1 ml-1'
										/>
									) : (
										<SVG
											name='lightBulbFill'
											classes='fill-current text-white h-5 w-5 mt-1 ml-1'
										/>
									)}
								</div>
								<div
									className={`rounded-full h-7 w-7 mr-2 z-10 absolute top-1 left-0 ${
										milestoneState === 'Completed'
											? 'bg-green'
											: milestoneState === 'In progress'
											? 'bg-blue-darkest'
											: 'bg-gray'
									}`}
								>
									{milestoneState === 'Completed' ? (
										<SVG
											name='checkMark'
											classes='fill-current text-white h-7 w-7'
										/>
									) : milestoneState === 'In progress' ? (
										<SVG
											name='pulse'
											classes='fill-current text-white w-5 h-5 mt-1 ml-1'
										/>
									) : (
										<SVG
											name='lightBulbFill'
											classes='fill-current text-white h-5 w-5 mt-1 ml-1'
										/>
									)}
								</div>
								<div className='flex justify-between items-center flex-nowrap w-full mb-4 pl-10 '>
									<div className='box p-2 m-0 flex flex-nowrap flex-col w-full z-10'>
										<p className='text-blue-darkest text-lg break-words text-center w-full font-medium'>
											{milestone.title}
										</p>
										<p className=''>
											<span className='font-semibold text-gray-dark'>
												Start:{' '}
											</span>
											{moment(milestone.startDate).format('D-MMM-YY')}
										</p>
									</div>
								</div>
								{user?.isAdmin && !userView && (
									<div className='flex pl-10 justify-center w-full'>
										<Button
											label='Add update'
											type='button'
											disabled={false}
											variant='simple'
											color='green'
											buttonClasses='mb-4 mt-1 border py-0.5 px-1.5'
											onClick={() =>
												setModalState({
													...modalState,
													type: 'addUpdate',
													isOpen: true,
													id: milestone._id
												})
											}
										/>
									</div>
								)}
								{sortedUpdates.map(update => (
									<div className='flex pl-10 w-full' key={update._id}>
										<div
											className={`box relative flex border  w-full flex-col mb-4 p-1
											${
												milestoneState === 'Completed' && update.publish
													? 'border-green'
													: update.publish
													? 'border-blue-darkest '
													: 'border-gray-dark'
											}`}
										>
											<SVG
												name='chevronLeft'
												classes={`absolute w-5 h-5 right-2 top-0 fill-current text-gray-light transform transition-transform duration-300 ease-in-out  
												${
													milestoneState === 'Completed' && update.publish
														? 'text-green'
														: update.publish
														? 'text-blue-darkest'
														: 'text-gray-dark'
												}
												${openUpdate === update._id ? 'rotate-90 translate-y-2' : '-rotate-90'}`}
											/>
											{user?.isAdmin && !userView && (
												<SVG
													name='close'
													classes={`absolute left-1 top-0 fill-current text-red w-8 h-8 z-20 cursor-pointer`}
													onClick={() =>
														setModalState({
															...modalState,
															isOpen: true,
															type: 'deleteUpdate',
															id: update._id,
															date: new Date(update.date)
														})
													}
												/>
											)}
											<div
												className='flex justify-center w-full cursor-pointer z-10'
												onClick={() =>
													dispatch(
														setOpenUpdate(
															openUpdate === update._id ? '' : update._id
														)
													)
												}
											>
												<p className=''>
													<span className='font-semibold text-gray-dark'>
														Update:{' '}
													</span>
													{moment(update.date).format('D-MMM-YY')}
												</p>
											</div>
											<Collapse
												in={openUpdate === update._id}
												timeout='auto'
												collapsedSize={0}
												style={{ width: '100%' }}
											>
												<div className='p-2'>
													<div
														className={`py-2 px-3 mt-1  border rounded-md w-full ${
															!update.publish ? 'bg-gray-200' : ''
														}`}
													>
														<p
															className={`break-word w-full ${
																!update.publish
																	? 'italic text-center text-sm font-medium'
																	: ''
															}`}
														>
															{update.publish ? (
																update.notes
															) : moment().unix() >=
															  moment(update.date).unix() ? (
																'Update will be published shortly'
															) : (
																<>
																	Update will be published on:
																	<br />{' '}
																	{moment(update.date).format('D-MMM-YY')}
																</>
															)}
														</p>
													</div>
													{update.buttonLabel &&
														update.buttonLink &&
														update.publish && (
															<a
																href={update.buttonLink}
																rel='noreferrer noopener'
																target='_blank'
																className='w-full'
															>
																<Button
																	label={update.buttonLabel}
																	type='button'
																	variant='contained'
																	buttonClasses='px-1 py-0.5 mt-4'
																	color='green'
																	fullWidth
																/>
															</a>
														)}
													{user?.isAdmin && !userView && (
														<Button
															label='Edit update'
															type='button'
															variant='simple'
															buttonClasses='border rounded-md border-green px-1 py-0.5 mt-4'
															color='green'
															fullWidth
															onClick={() =>
																setModalState({
																	id: update._id,
																	type: 'editUpdate',
																	isOpen: true,
																	date: new Date(update.date),
																	notes: update.notes,
																	buttonLink: update.buttonLink,
																	buttonLabel: update.buttonLabel,
																	publish: update.publish
																})
															}
														/>
													)}
												</div>
											</Collapse>
										</div>
									</div>
								))}
								<div className='flex justify-between items-center flex-nowrap w-full mb-4 pl-10'>
									<div className='box p-2 m-0 flex flex-nowrap flex-col w-full z-10'>
										<p className=''>
											<span className='font-semibold text-gray-dark'>
												End:{' '}
											</span>
											{moment(milestone.endDate).format('D-MMM-YY')}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</>
			)}
		</>
	);
};

export default Index;
