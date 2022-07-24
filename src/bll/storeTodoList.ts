import {combineReducers} from 'redux';
import {todoListsReducer} from './reducers/todoListsReducer';
import {tasksReducer} from './reducers/tasksReducer';
import thunk from 'redux-thunk';
import {appReducer} from './reducers/appReducer';
import {authReducer} from './reducers/authReducer';
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