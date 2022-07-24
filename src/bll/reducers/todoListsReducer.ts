import {todoListsAPI, TodoListType} from '../../api/todoListsAPI';
import {FilterValueType} from '../../components/TodoList/Todolist';
import {AppDispatch} from '../storeTodoList';
import {RequestStatusType, secondaryLoading} from './appReducer';
import {handleNetworkError, handleServerError} from '../../utils/handleError';
import {getTasks} from './tasksReducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type InitialStateType = {
    todoLists: Array<TodoListDomainType>
}
export type TodoListDomainType = TodoListType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}
type UpdateDomainTodoListModelType = {
    title?: string
    filter?: FilterValueType
    entityStatus?: RequestStatusType
}

export const initialState: InitialStateType = {
    todoLists: [],
}

const slice = createSlice({
    name: 'todoLists',
    initialState: initialState,
    reducers: {
        removeTodoListAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.todoLists.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.todoLists.splice(index, 1);
            }
        },
        addTodoListAC(state, action: PayloadAction<{ todoList: TodoListType }>) {
            state.todoLists.unshift({...action.payload.todoList, filter: 'All', entityStatus: 'idle'});
        },
        getTodoListsAC(state, action: PayloadAction<{ todoLists: Array<TodoListType> }>) {
            state.todoLists = action.payload.todoLists;
        },
        updateTodoListStateAC(state, action: PayloadAction<{ id: string, model: UpdateDomainTodoListModelType }>) {
            const index = state.todoLists.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.todoLists[index] = {...state.todoLists[index], ...action.payload.model};
            }
        },
        clearTodoListsDataAC(state) {
            state.todoLists.length = 0;
        }
    }
});


export const todoListsReducer = slice.reducer;
export const {
    removeTodoListAC,
    getTodoListsAC,
    addTodoListAC,
    updateTodoListStateAC,
    clearTodoListsDataAC
} = slice.actions;

/////////Thunk

export const getTodoLists = () => (dispatch: AppDispatch) => {
    dispatch(secondaryLoading({secondaryLoading: 'loading'}));

    todoListsAPI.getTodoLists()
        .then(resp => {
            dispatch(getTodoListsAC({todoLists: resp.data}));
            dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
            return resp.data;
        })
        .then(todo => {
            todo.forEach(t => {
                dispatch(getTasks(t.id));
            })
        })
        .catch(e => {
            handleNetworkError(e, dispatch);
        });
};

export const addTodoList = (newTodoListTitle: string) => (dispatch: AppDispatch) => {
    dispatch(secondaryLoading({secondaryLoading: 'loading'}));

    todoListsAPI.createTodoList(newTodoListTitle)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(addTodoListAC({todoList: resp.data.data.item}));
                dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
            } else {
                handleServerError(resp.data, dispatch);
            }

        })
        .catch(e => {
            handleNetworkError(e, dispatch);
        });
};

export const changeTitle = (id: string, title: string) => (dispatch: AppDispatch) => {
    dispatch(secondaryLoading({secondaryLoading: 'loading'}));

    todoListsAPI.updateTodoList(id, title)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(updateTodoListStateAC({id, model: {title}}));
                dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
            } else {
                handleServerError(resp.data, dispatch);
            }
        })
        .catch(e => {
            handleNetworkError(e, dispatch);
        });
};

export const removeTodo = (id: string) => (dispatch: AppDispatch) => {
    dispatch(secondaryLoading({secondaryLoading: 'loading'}));
    dispatch(updateTodoListStateAC({id: id, model: {entityStatus: 'loading'}}));

    todoListsAPI.deleteTodoList(id)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(removeTodoListAC({id}));
                dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
            } else {
                handleServerError(resp.data, dispatch);
            }
        })
        .catch(e => {
            handleNetworkError(e, dispatch);
        });
};