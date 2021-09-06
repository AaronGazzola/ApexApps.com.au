import { RootState } from './../store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Project, ProjectsResponse, ProjectsState } from './projects.interface';
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
				`http://localhost:5000/projects/`,
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

export const setProject = createAsyncThunk(
	'projects/setProject',
	async (id: string, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: ProjectsResponse = await axios.post(
				`http://localhost:5000/projects/set-active`,
				{ id },
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

export const addProject = createAsyncThunk(
	'projects/addProject',
	async (title: string, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: ProjectsResponse = await axios.post(
				`http://localhost:5000/projects/`,
				{ title },
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
				`http://localhost:5000/projects/`,
				{ title, description },
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

export const deleteProject = createAsyncThunk(
	'projects/deleteProject',
	async (_, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: ProjectsResponse = await axios.delete(
				`http://localhost:5000/projects/`,
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
				`http://localhost:5000/projects/contract`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
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

export const editEstimate = createAsyncThunk(
	'projects/editEstimate',
	async (
		{
			startFrom,
			startTo,
			endFrom,
			endTo,
			costFrom,
			costTo
		}: {
			startFrom: String;
			startTo: String;
			endFrom: String;
			endTo: String;
			costFrom: Number;
			costTo: Number;
		},
		{ rejectWithValue, getState }
	) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: ProjectsResponse = await axios.put(
				`http://localhost:5000/projects/estimate`,
				{
					startFrom,
					startTo,
					endFrom,
					endTo,
					costFrom,
					costTo
				},
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

const initialState: ProjectsState = {
	loading: false
};

const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		clearProjects(state) {
			state.error = null;
			state.success = '';
			state.alert = null;
		},
		projectsTour(state) {
			state.project = {
				title: 'Metaphysics Online',
				_id: 'abc123',
				description:
					'We are what we repeatedly do. Excellence, therefore, isn’t an act, but a habit.',
				contractUploaded: false,
				estimate: {
					startFrom: new Date('1970-01-01T00:00:00.000+00:00'),
					startTo: new Date('1970-01-01T00:00:00.000+00:00'),
					endFrom: new Date('1970-03-31T00:00:00.000+00:00'),
					endTo: new Date('1970-04-07T00:00:00.000+00:00'),
					costFrom: 32000,
					costTo: 42000,
					currency: 'USD'
				}
			};
			state.projects = [
				{
					title: 'Metaphysics Online',
					_id: 'abc123',
					description:
						'We are what we repeatedly do. Excellence, therefore, isn’t an act, but a habit.',
					contractUploaded: false,
					estimate: {
						startFrom: new Date('1970-01-01T00:00:00.000+00:00'),
						startTo: new Date('1970-01-01T00:00:00.000+00:00'),
						endFrom: new Date('1970-03-31T00:00:00.000+00:00'),
						endTo: new Date('1970-04-07T00:00:00.000+00:00'),
						costFrom: 32000,
						costTo: 42000,
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

export const { clearProjects, projectsTour } = projectsSlice.actions;
export default projectsSlice.reducer;
