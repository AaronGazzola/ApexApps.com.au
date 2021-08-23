import { Project } from '../projects/projects.interface';

export interface User {
	userName?: string;
	clientName: string;
	email?: string;
	newEmail?: string;
	isVerified: boolean;
	isAdmin: boolean;
	_id: string;
	client?: Client;
	project?: Project;
	projects?: Project[];
}

export interface Client {
	clientName: string;
	email: string;
	isVerified: boolean;
	projects: Project[];
	_id: string;
}

export type UserState = {
	loading: boolean;
	isAuth: boolean;
	token?: string;
	user?: User;
	users?: User[];
	client?: User;
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
	};
}

export interface UpdateData {
	userName: string;
	email: string;
	currentPassword?: string;
	newPassword?: string;
}
