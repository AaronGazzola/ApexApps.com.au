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
	const { isAuth, user, onTour, userView } = useAppSelector(
		state => state.users
	);
	const loading = milestonesLoading || !milestones;

	const addMilestoneHandler = (index: number) => {
		dispatch(addMilestone(index));
	};

	useEffect(() => {
		if (isAuth && !onTour) dispatch(getMilestones());
	}, [isAuth]);

	return (
		<>
			<Meta title='Milestones | Apex Apps' />
			<h1 className='title'>Milestones</h1>
			{user && (!user?.isAdmin || userView) && loading ? (
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
					) : user?.isAdmin && !userView ? (
						<SVG
							onClick={e => addMilestoneHandler(0)}
							name='add'
							classes='fill-current text-green w-8 h-8 cursor-pointer'
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
							{user?.isAdmin && !userView && (
								<SVG
									onClick={e => addMilestoneHandler(index + 1)}
									name='add'
									classes='fill-current text-green w-8 h-8 cursor-pointer'
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
