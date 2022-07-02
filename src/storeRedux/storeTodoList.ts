import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {todoListsReducer} from '../reducers/todoListsReducer';
import {tasksReducer} from '../reducers/tasksReducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {TodoListActionsType} from '../actions/todoListsActions';
import {TaskActionType} from '../actions/tasksActions';

export type AppStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AppActionsType>;
export type AppActionsType = TodoListActionsType | TaskActionType;
export type AppThunk <ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>

const rootReducer = combineReducers({
    todoListsInitState: todoListsReducer,
    tasksInitState: tasksReducer
});

export const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

