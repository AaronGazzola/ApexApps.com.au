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
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL
						: 'http://localhost:5000'
				}/milestones/`,
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
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL
						: 'http://localhost:5000'
				}/milestones/`,
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
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL
						: 'http://localhost:5000'
				}/milestones/feature`,
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
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL
						: 'http://localhost:5000'
				}/milestones/step`,
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
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL
						: 'http://localhost:5000'
				}/milestones/`,
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
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL
						: 'http://localhost:5000'
				}/milestones/${milestoneId}`,
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
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL
						: 'http://localhost:5000'
				}/milestones/feature/${featureId}`,
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
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL
						: 'http://localhost:5000'
				}/milestones/step/${stepId}`,
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
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL
						: 'http://localhost:5000'
				}/milestones/update`,
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
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL
						: 'http://localhost:5000'
				}/milestones/update`,
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
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL
						: 'http://localhost:5000'
				}/milestones/update/${updateId}`,
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
		},
		milestonesLogout(state) {
			state.milestones = undefined;
		},
		milestonesTour(state) {
			state.milestones = [
				{
					title: 'Design and prototype',
					_id: 'milestone1',
					startDate: '2050-01-01T00:00:00.000+00:00',
					endDate: '2050-01-07T00:00:00.000+00:00',
					price: 2500,
					currency: 'USD',
					notes:
						'App design utilised a calming palette of cold colours with a simple and modern aesthetic',
					buttonLabel: 'View protoype',
					buttonLink: '/',
					features: [
						{
							_id: 'feature1',
							title: 'Logo design',
							state: 'Completed',
							steps: [
								{ _id: 'step1', content: 'Concept board' },
								{ _id: 'step2', content: 'Draft selection' }
							]
						},
						{
							_id: 'feature2',
							title: 'Navigation design',
							state: 'Completed',
							steps: [
								{ _id: 'step3', content: 'Header logo and links' },
								{ _id: 'step4', content: 'Drawer links and icons' },
								{ _id: 'step5', content: 'Footer design' },
								{ _id: 'step6', content: 'Colour palette' }
							]
						},
						{
							_id: 'feature3',
							title: 'Page layout',
							state: 'Completed',
							steps: [
								{ _id: 'step7', content: 'Text formatting and layout' },
								{
									_id: 'step8',
									content: 'Responsive page design for all screen sizes'
								},
								{ _id: 'step9', content: 'Color palette selection' }
							]
						}
					],
					updates: [
						{
							_id: 'update1',
							notes:
								'Click the button below to view a selection of logo designs in various colour palettes',
							date: '2050-01-07T00:00:00.000+00:00',
							buttonLink: '/',
							buttonLabel: 'View designs',
							publish: true
						}
					]
				},
				{
					title: 'User interface implementation',
					_id: 'milestone2',
					startDate: '2050-01-08T00:00:00.000+00:00',
					endDate: '2050-01-25T00:00:00.000+00:00',
					price: 5000,
					currency: 'USD',
					notes: 'Click button below to test frontend user interface',
					buttonLabel: 'Test interface',
					buttonLink: '/',
					features: [
						{
							_id: 'feature5',
							title: 'Develop interface components',
							state: 'Completed',
							steps: [
								{ _id: 'step13', content: 'Buttons' },
								{ _id: 'step14', content: 'Inputs' },
								{ _id: 'step15', content: 'Text and text boxes' },
								{ _id: 'step16', content: 'Loading animations' }
							]
						},
						{
							_id: 'feature6',
							title: 'Navigation implementation',
							state: 'Completed',
							steps: [
								{ _id: 'step17', content: 'Header' },
								{ _id: 'step18', content: 'Drawer' },
								{ _id: 'step19', content: 'Footer' }
							]
						},
						{
							_id: 'feature7',
							title: 'Implement static pages',
							state: 'In progress',
							steps: [
								{ _id: 'step20', content: 'About page' },
								{ _id: 'step21', content: 'Contact page' },
								{ _id: 'step22', content: 'Terms and conditions page' },
								{ _id: 'step23', content: 'Privacy policy page' }
							]
						},
						{
							_id: 'feature8',
							title: 'Site metadata',
							state: 'In progress',
							steps: [
								{ _id: 'step24', content: 'Favicon implementation' },
								{ _id: 'step25', content: 'Page tab titles' },
								{ _id: 'step26', content: 'page descriptions' },
								{ _id: 'step27', content: 'Page keywords' }
							]
						}
					],
					updates: [
						{
							_id: 'update2',
							notes:
								'Navigation user interface has been implemented, click the link below to view progress so far.',
							date: '2050-01-15T00:00:00.000+00:00',
							buttonLink: '/',
							buttonLabel: 'View designs',
							publish: true
						}
					]
				},
				{
					title: 'Core app functionality',
					_id: 'milestone3',
					startDate: '2050-01-25T00:00:00.000+00:00',
					endDate: '2050-02-14T00:00:00.000+00:00',
					price: 7500,
					currency: 'USD',
					notes: '',
					buttonLabel: '',
					buttonLink: '/',
					features: [
						{
							_id: 'feature9',
							title: 'Configure API server',
							state: 'Planned',
							steps: [
								{ _id: 'step28', content: 'Initialise database' },
								{ _id: 'step29', content: 'Instantiate datbase schemas' },
								{
									_id: 'step30',
									content: 'Design API routes and controllers'
								}
							]
						},
						{
							_id: 'feature10',
							title: 'User Authentication',
							state: 'Planned',
							steps: [
								{
									_id: 'step31',
									content: 'Login and Signup user interface'
								},
								{
									_id: 'step32',
									content:
										'Implement user authentication routes and controllers'
								},
								{
									_id: 'step33',
									content: 'Implement email verification'
								},
								{
									_id: 'step34',
									content: 'Implement forgot password routes and controllers'
								}
							]
						},
						{
							_id: 'feature11',
							title: 'User profile',
							state: 'Planned',
							steps: [
								{
									_id: 'step35',
									content: 'User profile interface implementation'
								},
								{
									_id: 'step36',
									content: 'Edit profile routes and controllers'
								},
								{
									_id: 'step37',
									content: 'Verify email change routes and controllers'
								}
							]
						}
					],
					updates: [
						{
							_id: 'update3',
							notes: '',
							date: '2050-02-01T00:00:00.000+00:00',
							buttonLink: '/',
							buttonLabel: '',
							publish: false
						},
						{
							_id: 'update4',
							notes: '',
							date: '2050-02-08T00:00:00.000+00:00',
							buttonLink: '/',
							buttonLabel: '',
							publish: false
						}
					]
				}
			];
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
	setOpenUpdate,
	milestonesTour,
	milestonesLogout
} = milestonesSlice.actions;
export default milestonesSlice.reducer;
