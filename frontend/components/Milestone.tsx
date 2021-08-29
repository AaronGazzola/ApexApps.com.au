import React, { useState } from 'react';
import { useAppSelector } from '../redux/hooks';

interface MilestoneProps {
	title?: string;
	startDate?: Date;
	endDate?: Date;
	price?: number;
	currency?: string;
	notes?: string;
	buttonLabel?: string;
	buttonLink?: string;
	features?: [
		{
			title: string;
			state: 'planned' | 'inProgress' | 'completed';
			steps: string[];
		}
	];
}

const Milestone = (props: MilestoneProps) => {
	const {
		title = '',
		startDate = new Date(),
		endDate = new Date(),
		price = 0,
		currency = 'usd',
		notes = '',
		buttonLabel = '',
		buttonLink = '',
		features = []
	} = props;
	const [state, setState] = useState({
		title,
		startDate,
		endDate,
		price,
		currency,
		notes,
		buttonLabel,
		buttonLink,
		features
	});

	const { user } = useAppSelector(state => state.users);
	if (user?.isAdmin) {
		return <div className='box w-72 sm:w-80'></div>;
	} else {
		return <div className='box w-72 sm:w-80'></div>;
	}
};

export default Milestone;
