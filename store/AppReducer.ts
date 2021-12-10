import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
    authToken: string;
}

const initState: AppState = {
    authToken: ''
};

const AppReducer = createSlice({
    name: 'app',
    initialState: initState,
    reducers: {
        setAuthToken: (state: AppState, { payload }: PayloadAction<string>) => {
            state.authToken = payload;
        }
    }
});

export const { setAuthToken } = AppReducer.actions;
export default AppReducer.reducer;