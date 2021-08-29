export interface Project {
	title: string;
	_id: string;
	description?: string;
	contractUploaded: boolean;
	estimate?: {
		startFrom: Date;
		startTo: Date;
		endFrom: Date;
		endTo: Date;
		costFrom: number;
		costTo: number;
		currency: 'USD' | 'AUD';
	};
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
