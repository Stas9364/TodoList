import {authAPI} from '../../api/authorizationAPI';
import {handleNetworkError, handleServerError} from '../../utils/handleError';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {mainLoading, secondaryLoading} from '../../App/appReducer';
import {clearTodoListsDataAC} from '../TodoList/todoListsReducer';

export type InitStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

export const initState: InitStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false
};

//////THUNKS

export const getAuthData = createAsyncThunk(
    'auth/getAuthData',
    async (arg, thunkAPI) => {
        thunkAPI.dispatch(mainLoading({mainLoading: 'loading'}));
        try {
            const resp = await authAPI.authorization();
            if (resp.data.resultCode === 0) {
                return {
                    id: resp.data.data.id,
                    email: resp.data.data.email,
                    login: resp.data.data.login,
                    isAuth: true
                };
            } else if (resp.data.resultCode === 1) {
                //handleServerError(resp.data, thunkAPI.dispatch);
            }
        } catch (error) {
            handleNetworkError(error, thunkAPI.dispatch);
        } finally {
            thunkAPI.dispatch(mainLoading({mainLoading: 'succeeded'}));
        }
    }
);

export const login = createAsyncThunk<{}, { email: string, password: string, rememberMe: boolean },
    {rejectValue: {errors: Array<string>, fieldsErrors?: Array<string> | undefined}}>(
    'auth/login',
    async (param: { email: string, password: string, rememberMe: boolean }, thunkAPI) => {
        thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'loading'}));
        try {
            const resp = await authAPI.login(param.email, param.password, param.rememberMe);
            if (resp.data.resultCode === 0) {
                thunkAPI.dispatch(getAuthData());
            } else if (resp.data.resultCode === 1) {
                // @ts-ignore
                handleServerError(resp.data, thunkAPI.dispatch);
                return thunkAPI.rejectWithValue(
                    {errors: resp.data.messages, fieldsErrors: resp.data.fieldsErrors});
            }
        } catch (error: any) {
            handleNetworkError(error, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(
                {errors: error.message, fieldsErrors: undefined});
        } finally {
            thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (arg, thunkAPI) => {
        thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'loading'}));
        try {
            const resp = await authAPI.logout();
            if (resp.data.resultCode === 0) {
                thunkAPI.dispatch(clearTodoListsDataAC());
                return {id: null, email: null, login: null, isAuth: false};
            }
        } catch (e) {
            handleNetworkError(e, thunkAPI.dispatch);
        }finally {
            thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
        }
    }
);

const slice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {},
    extraReducers (builder) {
        builder.addCase(getAuthData.fulfilled, (state, action) => {
            if (action.payload) {
                state.id = action.payload.id;
                state.login = action.payload.login;
                state.email = action.payload.email;
                state.isAuth = action.payload.isAuth;
            }
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            if (action.payload) {
                state.id = action.payload.id;
                state.login = action.payload.login;
                state.email = action.payload.email;
                state.isAuth = action.payload.isAuth;
            }
        });
    }
});

export const authReducer = slice.reducer;
