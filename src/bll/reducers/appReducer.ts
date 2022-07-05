import {ACTIONS_APP_TYPE, AppActionsTypes} from '../actions/appActions';

export type InitStateType = {
    mainLoading: RequestStatusType
    secondaryLoading: RequestStatusType
    error: string | null;
};
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export const initState: InitStateType = {
    mainLoading: 'idle',
    secondaryLoading: 'idle',
    error: null
}

export const appReducer = (state: InitStateType = initState, action: AppActionsTypes): InitStateType => {
    switch (action.type) {
        case ACTIONS_APP_TYPE.MAIN_LOADING:
            return {...state, mainLoading: action.status};
        case ACTIONS_APP_TYPE.SECONDARY_LOADING:
            return {...state, secondaryLoading: action.status};
        case ACTIONS_APP_TYPE.CHANGE_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
};


