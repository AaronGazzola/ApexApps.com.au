import { RootState } from './../store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	UserState,
	LoginData,
	SignupData,
	UserResponse,
	User,
	UpdateData,
	Proposal
} from './users.interface';
import axios from 'axios';

const config = {
	headers: {
		'Content-Type': 'application/json'
	}
};

export const login = createAsyncThunk(
	'users/login',
	async (userData: LoginData, { rejectWithValue }) => {
		try {
			const { data }: UserResponse = await axios.post(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/auth/login`,
				userData,
				config
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const signup = createAsyncThunk(
	'users/signup',
	async (userData: SignupData, { rejectWithValue }) => {
		try {
			const { data }: UserResponse = await axios.post(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/auth/signup`,
				userData,
				config
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const getUser = createAsyncThunk(
	'users/getUser',
	async (_, { rejectWithValue, getState }) => {
		const {
			users: { token: stateToken }
		} = getState() as RootState;

		const localUserData = localStorage.getItem('userData');

		let localToken = '';
		if (localUserData) localToken = JSON.parse(localUserData).token;

		const token = localToken ? localToken : stateToken ? stateToken : '';

		if (!token) return;
		try {
			const { data }: UserResponse = await axios.get(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/auth/me`,
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const updateUser = createAsyncThunk(
	'users/updateUser',
	async (formData: UpdateData, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: UserResponse = await axios.put(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/users/`,
				formData,
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const cancelEmailUpdate = createAsyncThunk(
	'users/cancelEmailUpdate',
	async (_, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: UserResponse = await axios.post(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/users/cancel-email-update`,
				_,
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const addUser = createAsyncThunk(
	'users/addUser',
	async (name: string, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: UserResponse = await axios.post(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/users/`,
				{ name },
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const updateClient = createAsyncThunk(
	'users/updateClient',
	async (name: string, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: UserResponse = await axios.put(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/users/client`,
				{ clientName: name },
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const getUsers = createAsyncThunk(
	'users/getUsers',
	async (_, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: UserResponse = await axios.get(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/users/`,
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const sendVerifyUser = createAsyncThunk(
	'users/sendVerifyUser',
	async (email: string, { rejectWithValue }) => {
		try {
			const { data }: { data: { email: string; success: boolean } } =
				await axios.post(
					`${
						process.env.NODE_ENV === 'production'
							? process.env.BASE_URL + '/api'
							: 'http://localhost:5000/api'
					}/users/send-verify-user`,
					{ email },
					config
				);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const findUserById = createAsyncThunk(
	'users/findUserById',
	async (id: string, { rejectWithValue }) => {
		try {
			const { data }: { data: { success: boolean; foundUser?: User } } =
				await axios.post(
					`${
						process.env.NODE_ENV === 'production'
							? process.env.BASE_URL + '/api'
							: 'http://localhost:5000/api'
					}/users/find-by-id`,
					{ id },
					config
				);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const verifyUser = createAsyncThunk(
	'users/verifyUser',
	async (token: string, { rejectWithValue }) => {
		try {
			const { data }: UserResponse = await axios.post(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/users/verify-user`,
				{ token },
				config
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const verifyEmail = createAsyncThunk(
	'users/verifyEmail',
	async (token: string, { rejectWithValue }) => {
		try {
			const { data }: UserResponse = await axios.post(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/users/verify-email`,
				{ token },
				config
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const forgotPassword = createAsyncThunk(
	'users/forgotPassword',
	async (email: string, { rejectWithValue }) => {
		try {
			const { data }: { data: { email: string; success: boolean } } =
				await axios.post(
					`${
						process.env.NODE_ENV === 'production'
							? process.env.BASE_URL + '/api'
							: 'http://localhost:5000/api'
					}/users/forgot-password`,
					{ email },
					config
				);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const resetPassword = createAsyncThunk(
	'users/resetPassword',
	async (
		{ token, password }: { token: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const { data }: UserResponse = await axios.post(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/users/reset-password`,
				{ token, password },
				config
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const setClient = createAsyncThunk(
	'users/setClient',
	async (clientName: string, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;
		try {
			const { data }: UserResponse = await axios.post(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/users/set-client`,
				{ clientName },
				{
					headers: {
						...config.headers,
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const addProposal = createAsyncThunk(
	'users/addProposal',
	async (proposal: Proposal, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;
		try {
			const { data }: UserResponse = await axios.post(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/users/proposals`,
				proposal,
				{
					headers: {
						...config.headers,
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const editProposal = createAsyncThunk(
	'users/editProposal',
	async (
		{ proposal, proposalId }: { proposal: Proposal; proposalId: string },
		{ rejectWithValue, getState }
	) => {
		const {
			users: { token }
		} = getState() as RootState;
		try {
			const { data }: UserResponse = await axios.put(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/users/proposals`,
				{ proposal, proposalId },
				{
					headers: {
						...config.headers,
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const setProposal = createAsyncThunk(
	'users/setProposal',
	async (proposalId: string, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;
		try {
			const { data }: UserResponse = await axios.post(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/users/proposals/set`,
				{ proposalId },
				{
					headers: {
						...config.headers,
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const getProposals = createAsyncThunk(
	'users/getProposals',
	async (_, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;
		try {
			const { data }: UserResponse = await axios.get(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/users/proposals`,
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const getProposalById = createAsyncThunk(
	'users/getProposalById',
	async (proposalId: string, { rejectWithValue }) => {
		try {
			const { data }: UserResponse = await axios.get(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/users/proposals/${proposalId}`,
				config
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const getClientProposal = createAsyncThunk(
	'users/getClientProposal',
	async (_, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;
		try {
			const { data }: UserResponse = await axios.get(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/users/proposals/client`,
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const deleteProposal = createAsyncThunk(
	'users/deleteProposal',
	async (proposalId: string, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;
		try {
			const { data }: UserResponse = await axios.delete(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/users/proposals/${proposalId}`,
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const sendEmail = createAsyncThunk(
	'users/sendEmail',
	async (
		formData: {
			name: string;
			email: string;
			contactEmail: string;
			projectTitle: string;
			projectDescription: string;
			emailComments: string;
		},
		{ rejectWithValue, getState }
	) => {
		const {
			users: { token }
		} = getState() as RootState;
		try {
			const { data }: UserResponse = await axios.post(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/users/send-email`,
				formData,
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const bookCall = createAsyncThunk(
	'users/bookCall',
	async (
		formData: {
			name: string;
			email: string;
			contactEmail: string;
			projectTitle: string;
			projectDescription: string;
			contactMethod: string;
			phone: string;
			zoomName: string;
			callTime: string;
		},
		{ rejectWithValue, getState }
	) => {
		const {
			users: { token }
		} = getState() as RootState;
		try {
			const { data }: UserResponse = await axios.post(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/users/book-call`,
				formData,
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const getBookings = createAsyncThunk(
	'users/getBookings',
	async (_, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;
		try {
			const { data }: UserResponse = await axios.get(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/users/bookings`,
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const confirmBooking = createAsyncThunk(
	'users/confirmBooking',
	async (bookingId: string, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;
		try {
			const { data }: UserResponse = await axios.post(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/users/bookings/confirm`,
				{ bookingId },
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

const initialState: UserState = {
	loading: false,
	isAuth: false,
	token: ''
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		clearUsersRedirect(state) {
			state.redirect = undefined;
		},
		clearUsersTrigger(state) {
			state.trigger = undefined;
		},
		usersLogout(state) {
			state.isAuth = false;
			state.noUser = false;
			state.user = undefined;
			state.client = undefined;
			localStorage.removeItem('userData');
			state.onTour = false;
			state.token = '';
		},
		clearUsers(state) {
			state.error = null;
			state.success = '';
			state.alert = null;
		},
		resetProposal(state) {
			state.proposal = {
				title: 'New Proposal',
				sections: [
					{
						title: '',
						content: '',
						buttonLink: '',
						buttonLabel: ''
					}
				],
				videoLink: ''
			};
		},
		userTour(state) {
			state.trigger = 'showDrawer';
			state.isAuth = true;
			state.onTour = true;
			state.success = 'Welcome!';
			state.client = {
				userName: 'Jane Doe',
				clientName: 'tourClient',
				email: 'jane@example.com',
				isVerified: true,
				isAdmin: false,
				_id: 'abc123'
			};
			state.user = {
				userName: 'Jane Doe',
				clientName: 'tourClient',
				email: 'jane@example.com',
				isVerified: true,
				isAdmin: false,
				_id: 'abc123',
				client: {
					userName: 'Jane Doe',
					clientName: 'tourClient',
					email: 'jane@example.com',
					isVerified: true,
					isAdmin: false,
					_id: 'abc123'
				}
			};
		},
		toggleUserView(state) {
			state.userView = !state.userView;
		}
	},
	extraReducers: builder => {
		builder.addCase(login.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.user = action.payload.user;
			state.noUser = false;
			state.isAuth = !!action.payload.token;
			state.token = action.payload.token;
			state.loading = false;
			state.redirect = '/project';
			state.success = `Welcome ${action.payload.user?.userName}!`;
			localStorage.setItem(
				'userData',
				JSON.stringify({
					user: action.payload.user,
					isAuth: !!action.payload.token,
					token: action.payload.token
				})
			);
		});
		builder.addCase(login.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
			state.isAuth = false;
			state.token = '';
			state.user = undefined;
		});
		builder.addCase(signup.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(signup.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload.user;
			state.isAuth = false;
			state.trigger = 'sendVerifyUser';
			state.alert = {
				title: 'Success',
				message: 'Please check your email inbox to verify your account',
				titleColor: 'green'
			};
		});
		builder.addCase(signup.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
			state.isAuth = false;
			state.token = '';
			state.user = undefined;
		});
		builder.addCase(sendVerifyUser.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(sendVerifyUser.fulfilled, (state, action) => {
			state.loading = false;
			state.success = `Email sent to ${action.payload.email}`;
		});
		builder.addCase(sendVerifyUser.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(getUser.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.loading = false;
			if (action.payload) {
				state.user = action.payload.user;
				state.isAuth = !!action.payload.token;
				state.token = action.payload.token;
				state.client = action.payload.client;
			} else {
				state.noUser = true;
			}
		});
		builder.addCase(getUser.rejected, (state, action) => {
			state.error = {
				message: action.payload as string,
				retry: 'getUser'
			};
			state.loading = false;
			state.isAuth = false;
			state.token = '';
			state.user = undefined;
		});
		builder.addCase(updateUser.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(updateUser.fulfilled, (state, action) => {
			state.user = action.payload.user;
			state.isAuth = !!action.payload.token;
			state.token = action.payload.token;
			state.loading = false;
			if (action.payload.user?.newEmail) {
				state.alert = {
					title: 'Success',
					message: 'Please check your inbox to verify your new email',
					titleColor: 'green'
				};
			} else {
				state.success = 'Profile updated!';
			}
		});
		builder.addCase(updateUser.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(addUser.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(addUser.fulfilled, (state, action) => {
			state.loading = false;
			state.client = action.payload.client;
			state.user = action.payload.user;
			state.success = 'Client added';
		});
		builder.addCase(addUser.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(getUsers.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getUsers.fulfilled, (state, action) => {
			state.loading = false;
			state.users = action.payload.users;
		});
		builder.addCase(getUsers.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(updateClient.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(updateClient.fulfilled, (state, action) => {
			state.loading = false;
			state.success = 'Client updated';
			state.client = action.payload.client;
			state.user = action.payload.user;
			state.trigger = 'getUsers';
		});
		builder.addCase(updateClient.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(findUserById.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(findUserById.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload.foundUser;
		});
		builder.addCase(findUserById.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(verifyUser.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(verifyUser.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload.user;
			state.isAuth = !!action.payload.token;
			state.token = action.payload.token;
			state.success = 'Account verified';
			localStorage.setItem(
				'userData',
				JSON.stringify({
					user: action.payload.user,
					isAuth: !!action.payload.token,
					token: action.payload.token
				})
			);
		});
		builder.addCase(verifyUser.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(verifyEmail.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(verifyEmail.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload.user;
			state.isAuth = !!action.payload.token;
			state.token = action.payload.token;
			state.success = 'Email updated';
		});
		builder.addCase(verifyEmail.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(forgotPassword.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(forgotPassword.fulfilled, (state, action) => {
			state.loading = false;
			state.alert = {
				title: 'Success',
				message:
					'Please check your email inbox for a link to reset your password',
				titleColor: 'green'
			};
		});
		builder.addCase(forgotPassword.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(resetPassword.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(resetPassword.fulfilled, (state, action) => {
			state.loading = false;

			state.user = action.payload.user;
			state.isAuth = !!action.payload.token;
			state.token = action.payload.token;
			state.success = 'Password reset';
		});
		builder.addCase(resetPassword.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(setClient.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(setClient.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload.user;
			state.client = action.payload.client;
			state.trigger = 'getProjects';
		});
		builder.addCase(setClient.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(addProposal.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(addProposal.fulfilled, (state, action) => {
			state.loading = false;
			state.proposal = action.payload.proposal;
			state.proposals = action.payload.proposals;
			state.user = action.payload.user;
			state.success = 'Proposal added';
		});
		builder.addCase(addProposal.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(editProposal.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(editProposal.fulfilled, (state, action) => {
			state.loading = false;
			state.proposal = action.payload.proposal;
			state.proposals = action.payload.proposals;
			state.user = action.payload.user;
			state.success = 'Proposal updated';
		});
		builder.addCase(editProposal.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(getProposals.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(getProposals.fulfilled, (state, action) => {
			state.loading = false;
			state.proposals = action.payload.proposals;
		});
		builder.addCase(getProposals.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(getClientProposal.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(getClientProposal.fulfilled, (state, action) => {
			state.loading = false;
			state.proposal = action.payload.proposal;
		});
		builder.addCase(getClientProposal.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(setProposal.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(setProposal.fulfilled, (state, action) => {
			state.loading = false;
			state.proposal = action.payload.proposal;
		});
		builder.addCase(setProposal.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(deleteProposal.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(deleteProposal.fulfilled, (state, action) => {
			state.loading = false;
			state.proposals = action.payload.proposals;
			state.success = 'Proposal deleted';
			state.trigger = 'resetProposal';
		});
		builder.addCase(deleteProposal.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(getProposalById.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getProposalById.fulfilled, (state, action) => {
			state.loading = false;
			state.proposal = action.payload.proposal;
		});
		builder.addCase(getProposalById.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(sendEmail.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(sendEmail.fulfilled, (state, action) => {
			state.loading = false;
			state.success = 'Email sent';
		});
		builder.addCase(sendEmail.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(bookCall.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(bookCall.fulfilled, (state, action) => {
			state.loading = false;
			state.bookings = action.payload.bookings;
			state.alert = {
				title: 'Success',
				message:
					'Thank you for booking a call, you will recieve a confirmation email as soon as possible.',
				titleColor: 'green'
			};
		});
		builder.addCase(bookCall.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(getBookings.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getBookings.fulfilled, (state, action) => {
			state.loading = false;
			state.bookings = action.payload.bookings;
		});
		builder.addCase(getBookings.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(confirmBooking.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(confirmBooking.fulfilled, (state, action) => {
			state.loading = false;
			state.success = 'Booking confirmed';
		});
		builder.addCase(confirmBooking.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(cancelEmailUpdate.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(cancelEmailUpdate.fulfilled, (state, action) => {
			state.loading = false;
			state.success = 'Email update canceled';
			state.user = action.payload.user;
		});
		builder.addCase(cancelEmailUpdate.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
	}
});
export const {
	usersLogout,
	clearUsers,
	resetProposal,
	userTour,
	toggleUserView,
	clearUsersRedirect,
	clearUsersTrigger
} = usersSlice.actions;
export default usersSlice.reducer;
