import {ResponseType} from "../api/tasksAPI";
import {AppDispatch} from "../bll/storeTodoList";
import {changeErrorAC, secondaryLoadingAC} from "../bll/actions/appActions";

export const handleServerError = <D>(data: ResponseType<D>, dispatch: AppDispatch) => {
    if (data.messages.length) {
        dispatch(changeErrorAC(data.messages[0]));
    } else {
        dispatch(changeErrorAC('Some error has occurred'));
    }
    dispatch(secondaryLoadingAC('failed'));
};

export const handleNetworkError = (e: { message: string | null }, dispatch: AppDispatch) => {
    dispatch(changeErrorAC(e.message ? e.message : 'Something went wrong'));
    dispatch(secondaryLoadingAC('failed'));
};