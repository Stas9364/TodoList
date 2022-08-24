import {RootState} from '../../reduxStore/storeTodoList';

export const isAuthSelector = (state: RootState) => state.auth.isAuth;
export const loginSelector = (state: RootState) => state.auth.login;