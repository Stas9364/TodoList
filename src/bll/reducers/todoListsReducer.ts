 import {
    ACTIONS_TL_TYPE,
    addTodoListAC, changeEntityStatusAC,
    changeTodoListTitleAC,
    getTodoListsAC,
    removeTodoListAC, TodoListActionsType
} from '../actions/todoListsActions';
import {todoListsAPI, TodoListType} from "../../api/todoListsAPI";
import {FilterValueType} from "../../components/TodoList/Todolist";
import {AppThunk} from "../storeTodoList";
 import {secondaryLoadingAC, mainLoadingAC} from "../actions/appActions";
 import {RequestStatusType} from "./appReducer";

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
        case ACTIONS_TL_TYPE.CHANGE_TODOLIST_TITLE:
            return {
                ...state,
                todoLists: state.todoLists.map(el => el.id === action.id ? {...el, title: action.title} : el)
            };
        case ACTIONS_TL_TYPE.CHANGE_FILTER_VALUE:
            return {
                ...state,
                todoLists: state.todoLists.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
            };
        case ACTIONS_TL_TYPE.CHANGE_ENTITY_STATUS:
            return {
                ...state,
                todoLists: state.todoLists.map(el => el.id === action.id ? {...el, entityStatus: action.status} : el)
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
    dispatch(mainLoadingAC('loading'));
    todoListsAPI.getTodoLists()
        .then(resp => {
            dispatch(getTodoListsAC(resp.data));
            dispatch(mainLoadingAC('succeeded'));
            dispatch(secondaryLoadingAC('loading'));
        });
};

export const addTodoList = (newTodoListTitle: string): AppThunk => (dispatch) => {
    dispatch(secondaryLoadingAC('loading'));
    todoListsAPI.createTodoList(newTodoListTitle)
        .then(resp => {
            dispatch(addTodoListAC(resp.data.data.item));
            dispatch(secondaryLoadingAC('succeeded'));
        });
};

export const changeTitle = (id: string, title: string): AppThunk => (dispatch) => {
    dispatch(secondaryLoadingAC('loading'));
    todoListsAPI.updateTodoList(id, title)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(id, title));
                dispatch(secondaryLoadingAC('succeeded'));
            }
        });
};

export const removeTodo = (id: string): AppThunk => (dispatch) => {
    dispatch(secondaryLoadingAC('loading'));
    dispatch(changeEntityStatusAC(id, 'loading'));
    todoListsAPI.deleteTodoList(id)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(removeTodoListAC(id));
                dispatch(secondaryLoadingAC('succeeded'));
            }
        });
};