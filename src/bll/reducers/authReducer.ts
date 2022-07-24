import {AppDispatch} from '../storeTodoList';
import {authAPI} from '../../api/authorizationAPI';
import {handleNetworkError, handleServerError} from '../../utils/handleError';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {mainLoading, secondaryLoading} from './appReducer';
import {clearTodoListsDataAC} from './todoListsReducer';
// import {clearTasksDataAC} from './tasksReducer';

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
}

const slice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        authorization(state, action: PayloadAction<InitStateType>) {
            state.id = action.payload.id;
            state.login = action.payload.login;
            state.email = action.payload.email;
            state.isAuth = action.payload.isAuth;
        },
    },
});

export const authReducer = slice.reducer;
export const {authorization} = slice.actions;


//////THUNKS

export const getAuthData = () => (dispatch: AppDispatch) => {
    dispatch(mainLoading({mainLoading: 'loading'}));

    authAPI.authorization()
        .then(resp => resp.data)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(authorization({
                    id: data.data.id,
                    email: data.data.email,
                    login: data.data.login,
                    isAuth: true
                }));
            } else if (data.resultCode === 1) {
                // handleServerError(data, dispatch);
            }
            dispatch(mainLoading({mainLoading: 'succeeded'}));
        })
        .catch(e => {
            handleNetworkError(e, dispatch);
        });
};

export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: AppDispatch) => {
    dispatch(secondaryLoading({secondaryLoading: 'loading'}));

    authAPI.login(email, password, rememberMe)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(getAuthData());
                dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
            } else if (resp.data.resultCode === 1) {
                handleServerError(resp.data, dispatch);
                dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
            } else if (resp.data.resultCode === 10) {
                console.warn(resp.data.messages[0]);
                dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
            }
        })
        .catch(e => {
            handleNetworkError(e, dispatch);
        });
};

export const logout = () => (dispatch: AppDispatch) => {
    dispatch(secondaryLoading({secondaryLoading: 'loading'}));

    authAPI.logout()
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(authorization({id: null, email: null, login: null, isAuth: false}));
                dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
                dispatch(clearTodoListsDataAC());
                // dispatch(clearTasksDataAC());
            }
        })
        .catch(e => {
            handleNetworkError(e, dispatch);
        });
};