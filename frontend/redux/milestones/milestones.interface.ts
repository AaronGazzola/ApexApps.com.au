export interface Update {
	_id: string;
	notes: string;
	date: Date;
	buttonLink: string;
	buttonLabel: string;
	publish: boolean;
}

export interface Step {
	_id: string;
	content: string;
}

export interface Feature {
	_id: string;
	title: string;
	state: 'Planned' | 'In progress' | 'Completed';
	steps: Step[];
}

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
	features?: Feature[];
	updates?: Update[];
}

export interface MilestonesResponse {
	data: {
		success: boolean;
		milestone?: Milestone;
		milestones?: Milestone[];
		step?: Step;
		feature?: Feature;
		update?: Update;
	};
}

export interface MilestonesState {
	milestone?: Milestone;
	milestones?: Milestone[];
	openFeature: string;
	openMilestone: string;
	openUpdate: string;
	feature?: Feature;
	step?: Step;
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
