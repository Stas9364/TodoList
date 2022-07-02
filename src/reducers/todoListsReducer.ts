import {
    ACTIONS_TL_TYPE,
    addTodoListAC,
    changeTodoListTitleAC,
    getTodoListsAC, isLoadingAC,
    removeTodoListAC, TodoListActionsType
} from '../actions/todoListsActions';
import {todoListsAPI, TodoListType} from "../api/todoListsAPI";
import {FilterValueType} from "../TodoList/Todolist";
import {AppThunk} from "../storeRedux/storeTodoList";

export type InitialStateType = {
    todoLists: Array<TodoListDomainType>
    isLoading: boolean
}
export type TodoListDomainType = TodoListType & {
    filter: FilterValueType
}

export const initialState: InitialStateType = {
    todoLists: [],
    isLoading: true
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
                todoLists: [{...action.todoList, filter: 'All'}, ...state.todoLists]
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
        case ACTIONS_TL_TYPE.GET_TODO_LISTS:
            return {
                ...state,
                todoLists: [...action.todoLists]
            };
        case ACTIONS_TL_TYPE.IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
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
            dispatch(isLoadingAC(false));
        });
};

export const addTodoList = (newTodoListTitle: string): AppThunk => (dispatch) => {
    todoListsAPI.createTodoList(newTodoListTitle)
        .then(resp => {
            dispatch(addTodoListAC(resp.data.data.item));
        });
};

export const changeTitle = (id: string, title: string): AppThunk => (dispatch) => {
    todoListsAPI.updateTodoList(id, title)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(id, title));
            }
        });
};

export const removeTodo = (id: string): AppThunk => (dispatch) => {
    todoListsAPI.deleteTodoList(id)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(removeTodoListAC(id));
            }
        });
};