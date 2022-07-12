import {
    ACTIONS_TL_TYPE, addTodoListAC, getTodoListsAC, removeTodoListAC, TodoListActionsType, updateTodoListStateAC
} from '../actions/todoListsActions';
import {todoListsAPI, TodoListType} from '../../api/todoListsAPI';
import {FilterValueType} from '../../components/TodoList/Todolist';
import {AppThunk} from '../storeTodoList';
import {secondaryLoadingAC} from '../actions/appActions';
import {RequestStatusType} from './appReducer';
import {handleNetworkError, handleServerError} from '../../utils/handleError';

export type InitialStateType = {
    todoLists: Array<TodoListDomainType>
}
export type TodoListDomainType = TodoListType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}

export const initialState: InitialStateType = {
    todoLists: [],
}

export const todoListsReducer = (state: InitialStateType = initialState, action: TodoListActionsType): InitialStateType => {
    switch (action.type) {
        case ACTIONS_TL_TYPE.REMOVE_TODOLIST:
            return {
                ...state,
                todoLists: state.todoLists.filter(el => el.id !== action.id)
            };
        case ACTIONS_TL_TYPE.ADD_TODOLIST:
            return {
                ...state,
                todoLists: [{...action.todoList, filter: 'All', entityStatus: 'idle'}, ...state.todoLists]
            };
        case ACTIONS_TL_TYPE.UPDATE_TODO_LIST_STATE:
            return {
                ...state,
                todoLists: state.todoLists.map(el => el.id === action.id ? {...el, ...action.model} : el)
            };
        case ACTIONS_TL_TYPE.GET_TODO_LISTS:
            return {
                ...state,
                todoLists: [...action.todoLists]
            };
        default:
            return state;
    }
};

/////////Thunk

export const getTodoLists = (): AppThunk => (dispatch) => {
    todoListsAPI.getTodoLists()
        .then(resp => {
            dispatch(getTodoListsAC(resp.data));
            dispatch(secondaryLoadingAC('loading'));
        })
        .catch(e => {
            handleNetworkError(e, dispatch);
        });
};

export const addTodoList = (newTodoListTitle: string): AppThunk => (dispatch) => {
    dispatch(secondaryLoadingAC('loading'));
    todoListsAPI.createTodoList(newTodoListTitle)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(addTodoListAC(resp.data.data.item));
                dispatch(secondaryLoadingAC('succeeded'));
            } else {
                handleServerError(resp.data, dispatch);
            }
        })
        .catch(e => {
            handleNetworkError(e, dispatch);
        });
};

export const changeTitle = (id: string, title: string): AppThunk => (dispatch) => {
    dispatch(secondaryLoadingAC('loading'));
    todoListsAPI.updateTodoList(id, title)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(updateTodoListStateAC(id, {title}));
                dispatch(secondaryLoadingAC('succeeded'));
            } else {
                handleServerError(resp.data, dispatch);
            }
        })
        .catch(e => {
            handleNetworkError(e, dispatch);
        });
};

export const removeTodo = (id: string): AppThunk => (dispatch) => {
    dispatch(secondaryLoadingAC('loading'));
    dispatch(updateTodoListStateAC(id, {entityStatus: 'loading'}));
    todoListsAPI.deleteTodoList(id)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(removeTodoListAC(id));
                dispatch(secondaryLoadingAC('succeeded'));
            } else {
                handleServerError(resp.data, dispatch);
            }
        })
        .catch(e => {
            handleNetworkError(e, dispatch);
        });
};