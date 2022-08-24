import {RootState} from '../reduxStore/storeTodoList';

export const mainLoadingSelector = (state: RootState) => state.app.mainLoading;
export const secondaryLoadingSelector = (state: RootState) => state.app.secondaryLoading;