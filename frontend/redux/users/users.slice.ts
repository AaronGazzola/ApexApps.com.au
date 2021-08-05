import { RootState } from './../store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	UserState,
	LoginData,
	SignupData,
	UserResponse
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
	'users/getuser',
	async (_, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

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

const initialState: UserState = {
	loading: false,
	isAuth: false
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(login.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.user = action.payload.user;
			state.isAuth = !!action.payload.token;
			state.token = action.payload.token;
			state.loading = false;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.error = action.payload as string;
			state.loading = false;
			state.isAuth = false;
			state.token = '';
			state.user = undefined;
		});
		builder.addCase(signup.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(signup.fulfilled, (state, action) => {
			state.user = action.payload.user;
			state.isAuth = !!action.payload.token;
			state.token = action.payload.token;
			state.loading = false;
		});
		builder.addCase(signup.rejected, (state, action) => {
			state.error = action.payload as string;
			state.loading = false;
			state.isAuth = false;
			state.token = '';
			state.user = undefined;
		});
		builder.addCase(getUser.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.user = action.payload.user;
			state.isAuth = !!action.payload.token;
			state.token = action.payload.token;
			state.loading = false;
		});
		builder.addCase(getUser.rejected, (state, action) => {
			state.error = action.payload as string;
			state.loading = false;
			state.isAuth = false;
			state.token = '';
			state.user = undefined;
		});
	}
});

export default usersSlice.reducer;
