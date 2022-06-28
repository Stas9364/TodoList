import {applyMiddleware, combineReducers, compose, legacy_createStore} from 'redux';
import {todoListsReducer} from '../reducers/todoListsReducer';
import {tasksReducer} from '../reducers/tasksReducer';
import thunk from "redux-thunk";

export type AppStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todoListsInitState: todoListsReducer,
    tasksInitState: tasksReducer
});

declare global {
    interface Window {__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;}
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

