import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Canteen } from "../api/canteen";

interface AppState {
    authToken: string;
    activeCanteen: Canteen | undefined;
}

const initState: AppState = {
    authToken: '',
    activeCanteen: undefined
};

const AppReducer = createSlice({
    name: 'app',
    initialState: initState,
    reducers: {
        setAuthToken: (state: AppState, { payload }: PayloadAction<string>) => {
            state.authToken = payload;
        },
        clearAuthToken: (state: AppState) => {
            state.authToken = '';
        },
        setActiveCanteen: (state: AppState, { payload }: PayloadAction<Canteen>) => {
            state.activeCanteen = payload;
        },
        clearActiveCanteen: (state: AppState) => {
            state.activeCanteen = undefined;
        },
    }
});

export const { setAuthToken, clearAuthToken, setActiveCanteen, clearActiveCanteen } = AppReducer.actions;
export default AppReducer.reducer;