import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitStateType = {
    mainLoading: RequestStatusType
    secondaryLoading: RequestStatusType
    error: string | null;
};

export const initState: InitStateType = {
    mainLoading: 'idle',
    secondaryLoading: 'idle',
    error: null
};

const slice = createSlice({
    name: 'app',
    initialState: initState,
    reducers: {
        mainLoading(state, action: PayloadAction<{ mainLoading: RequestStatusType }>) {
            state.mainLoading = action.payload.mainLoading;
        },
        secondaryLoading(state, action: PayloadAction<{ secondaryLoading: RequestStatusType }>) {
            state.secondaryLoading = action.payload.secondaryLoading;
        },
        changeError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        }
    }
});

export const appReducer = slice.reducer;
export const {mainLoading, secondaryLoading, changeError} = slice.actions;