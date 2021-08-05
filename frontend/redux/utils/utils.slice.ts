import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UtilsState {
	breakpoint: string;
	screenWidth: number;
	screenHeight: number;
}

const initialState: UtilsState = {
	breakpoint: 'xs',
	screenWidth: 0,
	screenHeight: 0
};

const utilsSlice = createSlice({
	name: 'utils',
	initialState,
	reducers: {
		setDimensions: (state, action) => (state = action.payload)
	}
});

export const { setDimensions } = utilsSlice.actions;

export default utilsSlice.reducer;
