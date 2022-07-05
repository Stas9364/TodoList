import {RequestStatusType} from '../reducers/appReducer';

export enum ACTIONS_APP_TYPE {
    MAIN_LOADING = 'MAIN-LOADING',
    SECONDARY_LOADING = 'SECONDARY-LOADING',
    CHANGE_ERROR = 'CHANGE-ERROR'
}

export type AppActionsTypes =
    | ReturnType<typeof mainLoadingAC>
    | ReturnType<typeof secondaryLoadingAC>
    | ReturnType<typeof changeErrorAC>

export const mainLoadingAC = (status: RequestStatusType) => ({
    type: ACTIONS_APP_TYPE.MAIN_LOADING, status
} as const);

export const secondaryLoadingAC = (status: RequestStatusType) => ({
    type: ACTIONS_APP_TYPE.SECONDARY_LOADING, status
} as const);

export const changeErrorAC = (error: string | null) => ({
    type: ACTIONS_APP_TYPE.CHANGE_ERROR, error
} as const);
