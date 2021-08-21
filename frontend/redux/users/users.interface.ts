export interface User {
	userName?: string;
	clientName: string;
	email?: string;
	newEmail?: string;
	isVerified: boolean;
	isAdmin: boolean;
	_id: string;
}

export type UserState = {
	loading: boolean;
	isAuth: boolean;
	token?: string;
	user?: User;
	users?: User[];
	error?: string;
	success?: string;
	alert?: null | {
		title?: string;
		message: string;
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
