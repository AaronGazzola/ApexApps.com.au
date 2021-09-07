import { Milestone } from './../milestones/milestones.interface';
export interface Project {
	title: string;
	_id: string;
	description?: string;
	contractUploaded: boolean;
	estimate?: {
		startFrom: Date | string;
		startTo: Date | string;
		endFrom: Date | string;
		endTo: Date | string;
		costFrom: number;
		costTo: number;
		currency: 'USD' | 'AUD';
	};
	milestones?: Milestone[];
}

export interface ProjectsResponse {
	data: {
		success: boolean;
		project?: Project;
		projects?: Project[];
	};
}

export interface ProjectsState {
	project?: Project;
	projects?: Project[];
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
