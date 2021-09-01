import React, { useEffect, useState } from 'react';
import Meta from '../../components/Meta';
import Milestone from '../../components/Milestone';
import Button from '../../components/Button';
import SVG from '../../components/SVG';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
	addMilestone,
	getMilestones
} from '../../redux/milestones/milestones.slice';

const index = () => {
	const dispatch = useAppDispatch();
	const { milestones, loading: milestonesLoading } = useAppSelector(
		state => state.milestones
	);
	const { isAuth, user } = useAppSelector(state => state.users);
	const { project } = useAppSelector(state => state.projects);
	const loading = milestonesLoading || !milestones;

	const addMilestoneHandler = (index: number) => {
		dispatch(addMilestone(index));
	};

	// if logged in, get milestones
	useEffect(() => {
		if (isAuth && user?.project?._id === project?._id)
			dispatch(getMilestones());
	}, [isAuth, project]);

	return (
		<>
			<Meta title='Milestones | Apex Apps' />
			<h1 className='title'>Milestones</h1>
			{!user?.isAdmin && loading ? (
				<div
					className='w-10 h-10 border-t-2 border-l-2 border-blue-darkest animate-spin'
					style={{ borderRadius: '50%' }}
				></div>
			) : (
				<>
					{user?.isAdmin && loading ? (
						<div
							className='w-8 h-8 border-t-2 border-l-2 border-blue-darkest animate-spin'
							style={{ borderRadius: '50%' }}
						></div>
					) : user?.isAdmin ? (
						<Button
							type='button'
							size='large'
							variant='simple'
							color='green'
							onClick={e => addMilestoneHandler(0)}
							endIcon={
								<div className='w-8 h-8'>
									<SVG
										name='add'
										classes='fill-current text-green w-full h-full'
									/>
								</div>
							}
						/>
					) : (
						<div className='flex justify-between w-72 sm:w-80 px-2 py-1'>
							<div className='rounded-full border-2 border-gray-dark flex flex-nowrap px-1 py-0.5 items-center'>
								<SVG
									name='lightBulb'
									classes='fill-current text-gray-dark h-5 w-5'
								/>
								<p className='font-bold text-gray-dark text-xxs pr-1 '>
									Planned
								</p>
							</div>
							<div className='rounded-full bg-blue-darkest flex flex-nowrap px-1 py-0.5 items-center'>
								<SVG
									name='pulse'
									classes='fill-current text-white h-5 w-5 mx-0.5'
								/>
								<p className='font-bold text-white text-xxs pr-1 '>
									In Progress
								</p>
							</div>
							<div className='rounded-full bg-green flex flex-nowrap px-1 py-0.5 items-center'>
								<SVG
									name='checkMark'
									classes='fill-current text-white h-5 w-5'
								/>
								<p className='font-bold text-white text-xxs pr-1 '>Completed</p>
							</div>
						</div>
					)}

					{milestones?.map((milestone, index) => (
						<React.Fragment key={milestone._id}>
							<Milestone
								title={milestone.title}
								startDate={milestone.startDate}
								endDate={milestone.endDate}
								price={milestone.price}
								currency={milestone.currency}
								notes={milestone.notes}
								buttonLabel={milestone.buttonLabel}
								buttonLink={milestone.buttonLink}
								features={milestone.features}
								milestoneId={milestone._id}
							/>
							{user?.isAdmin && (
								<Button
									type='button'
									size='large'
									variant='simple'
									color='green'
									onClick={() => addMilestoneHandler(index + 1)}
									endIcon={
										<div className='w-8 h-8'>
											<SVG
												name='add'
												classes='fill-current text-green w-full h-full'
											/>
										</div>
									}
								/>
							)}
						</React.Fragment>
					))}
				</>
			)}
		</>
	);
};

export default index;
