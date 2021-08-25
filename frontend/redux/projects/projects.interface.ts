export interface Project {
	title: string;
	_id: string;
	description?: string;
	contract?: string;
	estimate?: {
		startFrom: Date;
		startTo: Date;
		EndFrom: Date;
		EndTo: Date;
		costFrom: number;
		costTo: number;
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
