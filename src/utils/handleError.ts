import {ResponseType} from '../api/tasksAPI';
import {changeError, secondaryLoading} from '../bll/reducers/appReducer';
import {Dispatch} from 'redux';

export const handleServerError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(changeError({error: data.messages[0]}));
    } else {
        dispatch(changeError({error: 'Some error has occurred'}));
    }
    dispatch(secondaryLoading({secondaryLoading: 'failed'}));
};

export const handleNetworkError = (e: any, dispatch: Dispatch) => {
    dispatch(changeError(e.message ? {error: e.message} : {error: 'Something went wrong'}));
    dispatch(secondaryLoading({secondaryLoading: 'failed'}));
};