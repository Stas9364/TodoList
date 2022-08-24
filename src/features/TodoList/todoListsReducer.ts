import {todoListsAPI, TodoListType} from '../../api/todoListsAPI';
import {FilterValueType} from './Todolist';
import {RequestStatusType, secondaryLoading} from '../../App/appReducer';
import {handleNetworkError, handleServerError} from '../../utils/handleError';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getTasks} from '../Task/tasksReducer';

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
};

export const getTodoLists = createAsyncThunk(
    'todoLists/getTodoLists',
    async (arg, thunkAPI) => {
        thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'loading'}));
        try {
            const resp = await todoListsAPI.getTodoLists();
            thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
            resp.data.forEach(t => {
                thunkAPI.dispatch(getTasks(t.id));
            });
            return {todoLists: resp.data};
        } catch (e) {
            handleNetworkError(e, thunkAPI.dispatch);
        }
    }
);

export const addTodoList = createAsyncThunk(
    'todoLists/addTodoList',
    async (newTodoListTitle: string, thunkAPI) => {
        thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'loading'}));
        try {
            const resp = await todoListsAPI.createTodoList(newTodoListTitle);
            if (resp.data.resultCode === 0) {
                thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
                return {todoList: resp.data.data.item};
            } else {
                handleServerError(resp.data, thunkAPI.dispatch);
            }
        } catch (e) {
            handleNetworkError(e, thunkAPI.dispatch);
        }
    }
);

export const updateTodoListState = createAsyncThunk(
    'todoLists/updateTodoListState',
    async (param: {
        id: string, title: string }, thunkAPI) => {
        thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'loading'}));
        try {
            const resp = await todoListsAPI.updateTodoList(param.id, param.title);
            if (resp.data.resultCode === 0) {
                thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
                return {id: param.id, model: {title: param.title}};
            } else {
                handleServerError(resp.data, thunkAPI.dispatch);
            }
        } catch (e) {
            handleNetworkError(e, thunkAPI.dispatch);
        }
    }
);

export const removeTodo = createAsyncThunk(
    'todoLists/removeTodo',
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'loading'}));
        thunkAPI.dispatch(updateTodoListStateAC({id: id, model: {entityStatus: 'loading'}}));
        try {
            const resp = await todoListsAPI.deleteTodoList(id);
            if (resp.data.resultCode === 0) {
                thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
                return {id};
            } else {
                handleServerError(resp.data, thunkAPI.dispatch);
            }
        } catch (e) {
            handleNetworkError(e, thunkAPI.dispatch);
        }
    }
);

const slice = createSlice({
    name: 'todoLists',
    initialState: initialState,
    reducers: {
        updateTodoListStateAC(state, action: PayloadAction<{ id: string, model: UpdateDomainTodoListModelType }>) {
            const index = state.todoLists.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.todoLists[index] = {...state.todoLists[index], ...action.payload.model};
            }
        },
        clearTodoListsDataAC(state) {
            state.todoLists.length = 0;
        }
    },
    extraReducers(builder) {
        builder.addCase(getTodoLists.fulfilled, (state, action) => {
            if (action.payload) {
                state.todoLists.push(...action.payload.todoLists);
            }
        });
        builder.addCase(addTodoList.fulfilled, (state, action) => {
            if (action.payload) {
                state.todoLists.unshift({...action.payload.todoList, filter: 'All', entityStatus: 'idle'});
            }
        });
        builder.addCase(updateTodoListState.fulfilled, (state, action) => {
            if (action.payload) {
                const index = state.todoLists.findIndex(todo => todo.id === action.payload?.id);
                if (index !== -1) {
                    state.todoLists[index] = {...state.todoLists[index], ...action.payload.model};
                }
            }
        });
        builder.addCase(removeTodo.fulfilled, (state, action) => {
            if (action.payload) {
                const index = state.todoLists.findIndex(todo => todo.id === action.payload?.id);
                if (index !== -1) {
                    state.todoLists.splice(index, 1);
                }
            }
        });
    }
});


export const todoListsReducer = slice.reducer;
export const {
    updateTodoListStateAC,
    clearTodoListsDataAC
} = slice.actions;

/////////Thunk

// export const getTodoLists_ = () => (dispatch: AppDispatch) => {
//     dispatch(secondaryLoading({secondaryLoading: 'loading'}));
//
//     todoListsAPI.getTodoLists()
//         .then(resp => {
//             dispatch(getTodoListsAC({todoLists: resp.data}));
//             dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
//             return resp.data;
//         })
//         .then(todo => {
//             todo.forEach(t => {
//                 dispatch(getTasks(t.id));
//             });
//         })
//         .catch(e => {
//             handleNetworkError(e, dispatch);
//         });
// };

// export const addTodoList_ = (newTodoListTitle: string) => (dispatch: AppDispatch) => {
//     dispatch(secondaryLoading({secondaryLoading: 'loading'}));
//
//     todoListsAPI.createTodoList(newTodoListTitle)
//         .then(resp => {
//             if (resp.data.resultCode === 0) {
//                 dispatch(addTodoListAC({todoList: resp.data.data.item}));
//                 dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
//             } else {
//                 handleServerError(resp.data, dispatch);
//             }
//
//         })
//         .catch(e => {
//             handleNetworkError(e, dispatch);
//         });
// };

// export const changeTitle_ = (id: string, title: string) => (dispatch: AppDispatch) => {
//     dispatch(secondaryLoading({secondaryLoading: 'loading'}));
//
//     todoListsAPI.updateTodoList(id, title)
//         .then(resp => {
//             if (resp.data.resultCode === 0) {
//                 dispatch(updateTodoListStateAC({id, model: {title}}));
//                 dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
//             } else {
//                 handleServerError(resp.data, dispatch);
//             }
//         })
//         .catch(e => {
//             handleNetworkError(e, dispatch);
//         });
// };
//
// export const removeTodo_ = (id: string) => (dispatch: AppDispatch) => {
//     dispatch(secondaryLoading({secondaryLoading: 'loading'}));
//     dispatch(updateTodoListStateAC({id: id, model: {entityStatus: 'loading'}}));
//
//     todoListsAPI.deleteTodoList(id)
//         .then(resp => {
//             if (resp.data.resultCode === 0) {
//                 dispatch(removeTodoListAC({id}));
//                 dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
//             } else {
//                 handleServerError(resp.data, dispatch);
//             }
//         })
//         .catch(e => {
//             handleNetworkError(e, dispatch);
//         });
// };