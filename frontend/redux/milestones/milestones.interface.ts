export interface Milestone {
	title: string;
	_id: string;
	startDate: Date;
	endDate: Date;
	price: number;
	currency: string;
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

export interface MilestonesResponse {
	data: {
		success: boolean;
		milestone?: Milestone;
		milestones?: Milestone[];
	};
}

export interface MilestonesState {
	milestone?: Milestone;
	milestones?: Milestone[];
	loading: boolean;
	error?: null | {
		title?: string;
		message: string;
		retry?: string;
	};
	success?: string;
	alert?: null | {
		title?: string;
		message: string;
		link?: string;
		buttonLabel?: string;
		titleColor?: string;
		buttonColor?: string;
	};
}
