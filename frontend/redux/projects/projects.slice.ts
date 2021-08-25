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
				`http://localhost:5000/projects/client/`,
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
	async (title: string, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: ProjectsResponse = await axios.post(
				`http://localhost:5000/projects/set-active`,
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

export const addProject = createAsyncThunk(
	'projects/addProject',
	async (
		{ title, clientId }: { title: string; clientId: string },
		{ rejectWithValue, getState }
	) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: ProjectsResponse = await axios.post(
				`http://localhost:5000/projects/`,
				{ title, clientId },
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

export const editProjectDetails = createAsyncThunk(
	'projects/editProjectDetails',
	async (
		{
			title,
			projectId,
			description
		}: { title: string; projectId: string; description: string },
		{ rejectWithValue, getState }
	) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: ProjectsResponse = await axios.post(
				`http://localhost:5000/projects/`,
				{ title, projectId, description },
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
		builder.addCase(editProjectDetails.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(editProjectDetails.fulfilled, (state, action) => {
			state.loading = false;
			state.projects = action.payload.projects;
			state.success = 'Project updated';
		});
		builder.addCase(editProjectDetails.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
	}
});

export const { clearProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
