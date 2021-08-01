import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	User,
	UserState,
	LoginData,
	SignupData,
	Response
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
			const { data }: Response = await axios.post(
				'http://localhost:5000/auth/login',
				userData,
				config
			);
			return data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const signup = createAsyncThunk('users/login', async () => {
	// fetch data
});

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
			state = { loading: false, isAuth: false, error: action.error.message };
		});
	}
});

export default usersSlice.reducer;
