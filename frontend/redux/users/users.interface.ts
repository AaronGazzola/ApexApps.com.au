import { Project } from '../projects/projects.interface';

export interface Proposal {
	title: string;
	sections: {
		title: string;
		content: string;
		buttonLabel: string;
		buttonLink: string;
	}[];
	videoLink: string;
	currentClient?: boolean;
	_id?: string;
	withClient?: boolean;
}

export interface User {
	userName?: string;
	clientName: string;
	email?: string;
	newEmail?: string;
	isVerified: boolean;
	isAdmin: boolean;
	_id: string;
	client?: User;
	project?: Project;
	projects?: Project[];
	proposal?: Proposal;
}

export type UserState = {
	loading: boolean;
	isAuth: boolean;
	token?: string;
	noUser?: boolean;
	onTour?: boolean;
	user?: User;
	users?: User[];
	client?: User;
	proposal?: Proposal;
	proposals?: Proposal[];
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
};

export interface LoginData {
	password: string;
	username: string;
}
export interface SignupData {
	email: string;
	password: string;
	userName: string;
	id: string;
}

export interface UserResponse {
	data: {
		success: boolean;
		token?: string;
		user?: User;
		users?: User[];
		client?: User;
		proposal?: Proposal;
		proposals?: Proposal[];
	};
}

export interface UpdateData {
	userName: string;
	email: string;
	currentPassword?: string;
	newPassword?: string;
}
