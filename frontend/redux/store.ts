import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/users.slice';
import projectsReducer from './projects/projects.slice';
import milestonesReducer from './milestones/milestones.slice';
import utilsReducer from './utils/utils.slice';

export const store = configureStore({
	reducer: {
		users: usersReducer,
		projects: projectsReducer,
		milestones: milestonesReducer,
		utils: utilsReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
