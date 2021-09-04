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

export const addFeature = createAsyncThunk(
	'projects/addFeature',
	async (
		{ index, milestoneId }: { index: number; milestoneId: string },
		{ rejectWithValue, getState }
	) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: MilestonesResponse = await axios.post(
				`http://localhost:5000/milestones/feature`,
				{ index, milestoneId },
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

export const addStep = createAsyncThunk(
	'projects/addStep',
	async (
		{ index, featureId }: { index: number; featureId: string },
		{ rejectWithValue, getState }
	) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: MilestonesResponse = await axios.post(
				`http://localhost:5000/milestones/step`,
				{ index, featureId },
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

export const editMilestone = createAsyncThunk(
	'projects/editMilestone',
	async (milestone: Milestone, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: MilestonesResponse = await axios.put(
				`http://localhost:5000/milestones/`,
				milestone,
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

export const deleteMilestone = createAsyncThunk(
	'projects/deleteMilestone',
	async (milestoneId: string, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: MilestonesResponse = await axios.delete(
				`http://localhost:5000/milestones/${milestoneId}`,
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

export const deleteFeature = createAsyncThunk(
	'projects/deleteFeature',
	async (featureId: string, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: MilestonesResponse = await axios.delete(
				`http://localhost:5000/milestones/feature/${featureId}`,
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

export const deleteStep = createAsyncThunk(
	'projects/deleteStep',
	async (stepId: string, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: MilestonesResponse = await axios.delete(
				`http://localhost:5000/milestones/step/${stepId}`,
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

export const addUpdate = createAsyncThunk(
	'projects/addUpdate',
	async (
		{
			id,
			date,
			notes,
			buttonLink,
			buttonLabel,
			publish
		}: {
			id: String;
			date: Date;
			notes: String;
			buttonLink: String;
			buttonLabel: String;
			publish: Boolean;
		},
		{ rejectWithValue, getState }
	) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: MilestonesResponse = await axios.post(
				`http://localhost:5000/milestones/update`,
				{ id, date, notes, buttonLink, buttonLabel, publish },
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

export const editUpdate = createAsyncThunk(
	'projects/editUpdate',
	async (
		{
			id,
			date,
			notes,
			buttonLink,
			buttonLabel,
			publish
		}: {
			id: String;
			date: Date;
			notes: String;
			buttonLink: String;
			buttonLabel: String;
			publish: Boolean;
		},
		{ rejectWithValue, getState }
	) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: MilestonesResponse = await axios.put(
				`http://localhost:5000/milestones/update`,
				{ id, date, notes, buttonLink, buttonLabel, publish },
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

export const deleteUpdate = createAsyncThunk(
	'projects/deleteUpdate',
	async (updateId: string, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: MilestonesResponse = await axios.delete(
				`http://localhost:5000/milestones/update/${updateId}`,
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
	loading: false,
	openFeature: '',
	openMilestone: '',
	openUpdate: ''
};

const milestonesSlice = createSlice({
	name: 'milestones',
	initialState,
	reducers: {
		clearMilestones(state) {
			state.error = null;
			state.success = '';
			state.alert = null;
		},
		setOpenFeature(state, action) {
			state.openFeature = action.payload;
		},
		setOpenMilestone(state, action) {
			state.openMilestone = action.payload;
		},
		setOpenUpdate(state, action) {
			state.openUpdate = action.payload;
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
		builder.addCase(addFeature.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(addFeature.fulfilled, (state, action) => {
			state.loading = false;
			state.milestones = action.payload.milestones;
			state.feature = action.payload.feature;
			state.success = 'Feature added';
		});
		builder.addCase(addFeature.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(addStep.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(addStep.fulfilled, (state, action) => {
			state.loading = false;
			state.milestones = action.payload.milestones;
			state.step = action.payload.step;
			state.success = 'Step added';
		});
		builder.addCase(addStep.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(editMilestone.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(editMilestone.fulfilled, (state, action) => {
			state.loading = false;
			state.milestones = action.payload.milestones;
			state.success = 'Milestone saved';
		});
		builder.addCase(editMilestone.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(deleteMilestone.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(deleteMilestone.fulfilled, (state, action) => {
			state.loading = false;
			state.milestones = action.payload.milestones;
			state.success = 'Milestone deleted';
		});
		builder.addCase(deleteMilestone.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(deleteFeature.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(deleteFeature.fulfilled, (state, action) => {
			state.loading = false;
			state.milestones = action.payload.milestones;
			state.success = 'Feature deleted';
		});
		builder.addCase(deleteFeature.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(deleteStep.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(deleteStep.fulfilled, (state, action) => {
			state.loading = false;
			state.milestones = action.payload.milestones;
			state.success = 'Step deleted';
		});
		builder.addCase(deleteStep.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(addUpdate.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(addUpdate.fulfilled, (state, action) => {
			state.loading = false;
			state.milestones = action.payload.milestones;
			state.success = 'Update added';
		});
		builder.addCase(addUpdate.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(editUpdate.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(editUpdate.fulfilled, (state, action) => {
			state.loading = false;
			state.milestones = action.payload.milestones;
			state.success = 'Update updated';
		});
		builder.addCase(editUpdate.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(deleteUpdate.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(deleteUpdate.fulfilled, (state, action) => {
			state.loading = false;
			state.milestones = action.payload.milestones;
			state.success = 'Update deleted';
		});
		builder.addCase(deleteUpdate.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
	}
});

export const {
	clearMilestones,
	setOpenFeature,
	setOpenMilestone,
	setOpenUpdate
} = milestonesSlice.actions;
export default milestonesSlice.reducer;
