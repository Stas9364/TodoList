import {AUTH_ACTION_TYPE, AuthActionsType, authorization} from '../actions/authActions';
import {AppThunk} from '../storeTodoList';
import {authAPI} from '../../api/authorizationAPI';
import {handleNetworkError, handleServerError} from '../../utils/handleError';
import {mainLoadingAC, secondaryLoadingAC} from "../actions/appActions";

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

export const authReducer = (state: InitStateType = initState, action: AuthActionsType): InitStateType => {
    switch (action.type) {
        case AUTH_ACTION_TYPE.AUTHORIZATION:
            return {...state, ...action.authData};
        default:
            return state;
    }
};

//////THUNKS

export const getAuthData = (): AppThunk => (dispatch) => {
    dispatch(mainLoadingAC('loading'));
    authAPI.authorization()
        .then(resp => resp.data)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(authorization(data.data.id, data.data.email, data.data.login, true));
            } else if (data.resultCode === 1) {
                console.log(data.messages[0])
                handleServerError(data, dispatch);
            }
            dispatch(mainLoadingAC('succeeded'));
        })
        .catch(e => {
            handleNetworkError(e, dispatch);
        });
};

export const login = (email: string, password: string, rememberMe: boolean): AppThunk => (dispatch) => {
    dispatch(secondaryLoadingAC('loading'));
    authAPI.login(email, password, rememberMe)
        .then(resp => {

            if (resp.data.resultCode === 0) {
                dispatch(getAuthData());
                dispatch(secondaryLoadingAC('succeeded'));

            } else if (resp.data.resultCode === 1) {
                handleServerError(resp.data, dispatch);
                dispatch(secondaryLoadingAC('succeeded'));

            }else if (resp.data.resultCode === 10) {
                console.warn(resp.data.messages[0]);
                dispatch(secondaryLoadingAC('succeeded'));
            }
        })
        .catch(e => {
            handleNetworkError(e, dispatch);
        });
};

export const logout = (): AppThunk => (dispatch) => {
    dispatch(secondaryLoadingAC('loading'));
    authAPI.logout()
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(authorization(null, null, null, false));
                dispatch(secondaryLoadingAC('succeeded'));
            }
        })
        .catch(e => {
            handleNetworkError(e, dispatch);
        });
};