import {combineReducers} from 'redux';
import {todoListsReducer} from '../features/TodoList/todoListsReducer';
import {tasksReducer} from '../features/Task/tasksReducer';
import thunk from 'redux-thunk';
import {appReducer} from '../App/appReducer';
import {authReducer} from '../features/Auth/authReducer';
import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(thunk)
            .concat(logger),
});