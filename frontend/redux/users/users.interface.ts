export interface User {
	userName: string;
	email: string;
	newEmail?: string;
	isVerified: boolean;
	isAdmin: boolean;
	_id: number;
}

export type UserState = {
	loading: boolean;
	isAuth: boolean;
	token?: string;
	user?: User;
	error?: string;
	success?: string;
	redirect?: string;
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
	};
}
