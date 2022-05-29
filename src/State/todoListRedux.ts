import {combineReducers, legacy_createStore} from 'redux';
import {todoListsReducer} from './todoLists/todoListsReducer';
import {tasksReducer} from './tasks/tasksReducer';

export type AppStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
});

export const store = legacy_createStore(rootReducer);

