import React, { useEffect } from 'react';
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
	const { milestones } = useAppSelector(state => state.milestones);

	const addMilestoneHandler = (index: number) => {
		dispatch(addMilestone(index));
	};

	useEffect(() => {
		dispatch(getMilestones());
	}, []);
	return (
		<>
			<Meta title='Milestones | Apex Apps' />
			<h1 className='title'>Milestones</h1>
			<Button
				type='button'
				size='large'
				variant='simple'
				color='green'
				onClick={e => addMilestoneHandler(0)}
				endIcon={
					<div className='w-8 h-8'>
						<SVG
							name='close'
							classes='fill-current text-green transform rotate-45 w-full h-full'
						/>
					</div>
				}
			/>
			{milestones?.map(milestone => (
				<React.Fragment key={milestone._id}>
					<Milestone />
					<Button
						type='button'
						size='large'
						variant='simple'
						color='green'
						endIcon={
							<div className='w-8 h-8'>
								<SVG
									name='close'
									classes='fill-current text-green transform rotate-45 w-full h-full'
								/>
							</div>
						}
					/>
				</React.Fragment>
			))}
		</>
	);
};

export default index;
