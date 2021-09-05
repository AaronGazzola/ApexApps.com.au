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
				'http://localhost:5000/auth/login',
				userData,
				config
			);
			return data;
		} catch (error) {
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
				'http://localhost:5000/auth/signup',
				userData,
				config
			);
			return data;
		} catch (error) {
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
				'http://localhost:5000/auth/me',
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error) {
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
				'http://localhost:5000/users/',
				formData,
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error) {
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
				'http://localhost:5000/users/',
				{ name },
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error) {
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
				'http://localhost:5000/users/client',
				{ clientName: name },
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error) {
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
				'http://localhost:5000/users/',
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error) {
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
					'http://localhost:5000/users/send-verify-user',
					{ email },
					config
				);
			return data;
		} catch (error) {
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
					'http://localhost:5000/users/find-by-id',
					{ id },
					config
				);
			return data;
		} catch (error) {
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
				'http://localhost:5000/users/verify-user',
				{ token },
				config
			);
			return data;
		} catch (error) {
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
				'http://localhost:5000/users/verify-email',
				{ token },
				config
			);
			return data;
		} catch (error) {
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
					'http://localhost:5000/users/forgot-password',
					{ email },
					config
				);
			return data;
		} catch (error) {
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
				'http://localhost:5000/users/reset-password',
				{ token, password },
				config
			);
			return data;
		} catch (error) {
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
				'http://localhost:5000/users/set-client',
				{ clientName },
				{
					headers: {
						...config.headers,
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error) {
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
				'http://localhost:5000/users/proposals',
				proposal,
				{
					headers: {
						...config.headers,
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error) {
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
				'http://localhost:5000/users/proposals',
				{ proposal, proposalId },
				{
					headers: {
						...config.headers,
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error) {
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
				'http://localhost:5000/users/proposals/set',
				{ proposalId },
				{
					headers: {
						...config.headers,
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error) {
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
				'http://localhost:5000/users/proposals',
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const getProposal = createAsyncThunk(
	'users/getProposal',
	async (_, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;
		try {
			const { data }: UserResponse = await axios.get(
				'http://localhost:5000/users/proposals/client',
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

const initialUser: User = {
	userName: '',
	clientName: '',
	email: '',
	isVerified: false,
	isAdmin: false,
	_id: '0'
};

const initialState: UserState = {
	loading: false,
	isAuth: false,
	user: initialUser,
	token: ''
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		logout(state) {
			state.isAuth = false;
			state.user = initialUser;
			localStorage.removeItem('userData');
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
		}
	},
	extraReducers: builder => {
		builder.addCase(login.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.user = action.payload.user;
			state.isAuth = !!action.payload.token;
			state.token = action.payload.token;
			state.loading = false;
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
		builder.addCase(getProposal.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(getProposal.fulfilled, (state, action) => {
			state.loading = false;
			state.proposal = action.payload.proposal;
		});
		builder.addCase(getProposal.rejected, (state, action) => {
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
	}
});
export const { logout, clearUsers, resetProposal } = usersSlice.actions;
export default usersSlice.reducer;
