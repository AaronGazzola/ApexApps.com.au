import { RootState } from './../store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProjectsResponse, ProjectsState } from './projects.interface';
import axios from 'axios';

const config = {
	headers: {
		'Content-Type': 'application/json'
	}
};

export const getProjects = createAsyncThunk(
	'projects/getProjects',
	async (_, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: ProjectsResponse = await axios.get(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/projects/`,
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

export const setProject = createAsyncThunk(
	'projects/setProject',
	async (id: string, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: ProjectsResponse = await axios.post(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/projects/set-active`,
				{ id },
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

export const addProject = createAsyncThunk(
	'projects/addProject',
	async (title: string, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: ProjectsResponse = await axios.post(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/projects/`,
				{ title },
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

export const editProject = createAsyncThunk(
	'projects/editProject',
	async (
		{ title, description }: { title: string; description: string },
		{ rejectWithValue, getState }
	) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: ProjectsResponse = await axios.put(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/projects/`,
				{ title, description },
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

export const deleteProject = createAsyncThunk(
	'projects/deleteProject',
	async (_, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: ProjectsResponse = await axios.delete(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/projects/`,
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

export const uploadContract = createAsyncThunk(
	'projects/uploadContract',
	async (file: File, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		const formData: FormData = new FormData();
		formData.append('contract', file);

		try {
			const { data }: ProjectsResponse = await axios.post(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/projects/contract`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
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

export const editEstimate = createAsyncThunk(
	'projects/editEstimate',
	async (
		{
			startFrom,
			startTo,
			endFrom,
			endTo,
			costFrom,
			costTo,
			currency
		}: {
			startFrom: String;
			startTo: String;
			endFrom: String;
			endTo: String;
			costFrom: Number;
			costTo: Number;
			currency: String;
		},
		{ rejectWithValue, getState }
	) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: ProjectsResponse = await axios.put(
				`${
					process.env.NODE_ENV === 'production'
						? process.env.BASE_URL + '/api'
						: 'http://localhost:5000/api'
				}/projects/estimate`,
				{
					startFrom,
					startTo,
					endFrom,
					endTo,
					costFrom,
					costTo,
					currency
				},
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

const initialState: ProjectsState = {
	loading: false
};

const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		clearProjectsTrigger(state) {
			state.trigger = undefined;
		},
		clearProjects(state) {
			state.error = null;
			state.success = '';
			state.alert = null;
		},
		projectsLogout(state) {
			state.project = undefined;
			state.projects = undefined;
		},
		projectsTour(state) {
			state.project = {
				title: "Jane's Amazing App",
				_id: 'abc123',
				description:
					'An incredible, highly profitable online web application designed and developed by Apex Apps.',
				contractUploaded: false,
				estimate: {
					startFrom: '2050-01-01T00:00:00.000+00:00',
					startTo: '2050-01-01T00:00:00.000+00:00',
					endFrom: '2050-03-31T00:00:00.000+00:00',
					endTo: '2050-04-30T00:00:00.000+00:00',
					costFrom: 36000,
					costTo: 48000,
					currency: 'USD'
				}
			};
			state.projects = [
				{
					title: "Jane's Amazing App",
					_id: 'abc123',
					description:
						'An incredible, highly profitable online web application designed and developed by Apex Apps.',
					contractUploaded: false,
					estimate: {
						startFrom: '2050-01-01T00:00:00.000+00:00',
						startTo: '2050-01-01T00:00:00.000+00:00',
						endFrom: '2050-03-31T00:00:00.000+00:00',
						endTo: '2050-04-30T00:00:00.000+00:00',
						costFrom: 36000,
						costTo: 48000,
						currency: 'USD'
					}
				}
			];
		}
	},
	extraReducers: builder => {
		builder.addCase(getProjects.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getProjects.fulfilled, (state, action) => {
			state.loading = false;
			state.projects = action.payload.projects;
			state.trigger = 'setProject';
		});
		builder.addCase(getProjects.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(addProject.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(addProject.fulfilled, (state, action) => {
			state.loading = false;
			state.projects = action.payload.projects;
			state.success = 'Project added';
			state.project = action.payload.project;
		});
		builder.addCase(addProject.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(setProject.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(setProject.fulfilled, (state, action) => {
			state.loading = false;
			state.project = action.payload.project;
		});
		builder.addCase(setProject.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(editProject.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(editProject.fulfilled, (state, action) => {
			state.loading = false;
			state.projects = action.payload.projects;
			state.success = 'Project updated';
			state.project = action.payload.project;
		});
		builder.addCase(editProject.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(deleteProject.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(deleteProject.fulfilled, (state, action) => {
			state.loading = false;
			state.projects = action.payload.projects;
			state.success = 'Project deleted';
			if (action.payload.projects) state.project = action.payload.projects[0];
		});
		builder.addCase(deleteProject.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(editEstimate.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(editEstimate.fulfilled, (state, action) => {
			state.loading = false;
			state.projects = action.payload.projects;
			state.project = action.payload.project;
			state.success = 'Estimate updated';
		});
		builder.addCase(editEstimate.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
		builder.addCase(uploadContract.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(uploadContract.fulfilled, (state, action) => {
			state.loading = false;
			state.success = 'Contract uploaded';
			state.project = action.payload.project;
		});
		builder.addCase(uploadContract.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
	}
});

export const {
	clearProjects,
	projectsTour,
	projectsLogout,
	clearProjectsTrigger
} = projectsSlice.actions;
export default projectsSlice.reducer;
