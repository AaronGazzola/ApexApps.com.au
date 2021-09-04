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
	const loading = milestonesLoading || !milestones;

	const addMilestoneHandler = (index: number) => {
		dispatch(addMilestone(index));
	};

	useEffect(() => {
		if (isAuth) dispatch(getMilestones());
	}, [isAuth]);

	return (
		<>
			<Meta title='Milestones | Apex Apps' />
			<h1 className='title'>Milestones</h1>
			{user && !user?.isAdmin && loading ? (
				<>
					<div className='box w-72 sm:w-80'>
						<div className='skeleton w-52 h-7 mb-4'></div>
						<div className='flex justify-between w-full mb-2'>
							<div className='skeleton w-28 h-4'></div>
							<div className='skeleton w-28 h-4'></div>
						</div>
						<div className='flex justify-between w-full mb-4'>
							<div className='skeleton w-28 h-4'></div>
							<div className='skeleton w-28 h-4'></div>
						</div>
						<div className='skeleton w-full h-8 mb-4'></div>
						<div className='skeleton w-full h-8 mb-4'></div>
						<div className='skeleton w-full h-8 mb-4'></div>
						<div className='skeleton w-full h-16 mb-4'></div>
						<div className='skeleton w-full h-8'></div>
					</div>
				</>
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
						<></>
					)}
					{milestones && !milestones.length && !loading && (
						<div className='box w-72 sm:w-80'>
							<p>No milestones to display</p>
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
