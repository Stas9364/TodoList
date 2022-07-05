import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {todoListsReducer} from './reducers/todoListsReducer';
import {tasksReducer} from './reducers/tasksReducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {TodoListActionsType} from './actions/todoListsActions';
import {TaskActionType} from './actions/tasksActions';
import {appReducer} from "./reducers/appReducer";
import {AppActionsTypes} from "./actions/appActions";

export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AppActionsType>;
export type AppActionsType = TodoListActionsType | TaskActionType | AppActionsTypes;
export type AppThunk <ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>

const rootReducer = combineReducers({
    todoListsInitState: todoListsReducer,
    tasksInitState: tasksReducer,
    app: appReducer
});

export const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

