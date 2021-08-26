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
			const { data }: ProjectsResponse = await axios.put(
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
	}
});

export const { clearProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
