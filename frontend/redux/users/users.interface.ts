export interface User {
	username: string;
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
};

export interface LoginData {
	password: string;
	username: string;
}
export interface SignupData {
	email: string;
	password: string;
	username: string;
}

export interface UserResponse {
	data: {
		success: boolean;
		token?: string;
		user?: User;
	};
}
