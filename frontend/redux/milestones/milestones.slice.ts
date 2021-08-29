import { RootState } from './../store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	Milestone,
	MilestonesResponse,
	MilestonesState
} from './milestones.interface';
import axios from 'axios';

const config = {
	headers: {
		'Content-Type': 'application/json'
	}
};

export const getMilestones = createAsyncThunk(
	'projects/getMilestones',
	async (_, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: MilestonesResponse = await axios.get(
				`http://localhost:5000/milestones/`,
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

export const addMilestone = createAsyncThunk(
	'projects/addMilestone',
	async (index: number, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: MilestonesResponse = await axios.post(
				`http://localhost:5000/milestones/`,
				{ index },
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

const initialState: MilestonesState = {
	loading: false
};

const milestonesSlice = createSlice({
	name: 'milestones',
	initialState,
	reducers: {
		clearMilestones(state) {
			state.error = null;
			state.success = '';
			state.alert = null;
		}
	},
	extraReducers: builder => {
		builder.addCase(getMilestones.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getMilestones.fulfilled, (state, action) => {
			state.loading = false;
			state.milestones = action.payload.milestones;
		});
		builder.addCase(getMilestones.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(addMilestone.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(addMilestone.fulfilled, (state, action) => {
			state.loading = false;
			state.milestones = action.payload.milestones;
			state.success = 'Milestone added';
		});
		builder.addCase(addMilestone.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
	}
});

export const { clearMilestones } = milestonesSlice.actions;
export default milestonesSlice.reducer;
