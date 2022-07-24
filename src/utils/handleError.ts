import {ResponseType} from '../api/tasksAPI';
import {changeError, secondaryLoading} from '../bll/reducers/appReducer';
import {AppDispatch} from '../bll/storeTodoList';

export const handleServerError = <D>(data: ResponseType<D>, dispatch: AppDispatch) => {
    if (data.messages.length) {
        dispatch(changeError({error:data.messages[0]}));
    } else {
        dispatch(changeError({error: 'Some error has occurred'}));
    }
    dispatch(secondaryLoading({secondaryLoading:'failed'}));
};

export const handleNetworkError = (e: { message: string | null }, dispatch: AppDispatch) => {
    dispatch(changeError(e.message ? {error:e.message} : {error:'Something went wrong'}));
    dispatch(secondaryLoading({secondaryLoading:'failed'}));
};