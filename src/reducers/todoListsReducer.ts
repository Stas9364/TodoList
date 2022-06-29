import {
    ACTIONS_TL_TYPE,
    ActionsType,
    addTodoListAC,
    changeTodoListTitleAC,
    getTodoListsAC, isLoadingAC,
    removeTodoListAC
} from '../actions/todoListsActions';
import {Dispatch} from "redux";
import {todoListsAPI, TodoListType} from "../TodoList/todoListsAPI";
import {FilterValueType} from "../TodoList/Todolist";

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

export const todoListsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ACTIONS_TL_TYPE.REMOVE_TODOLIST:
            return {
                ...state,
                todoLists: state.todoLists.filter(el => el.id !== action.id)
            }
        case ACTIONS_TL_TYPE.ADD_TODOLIST:
            const newTodoList: TodoListDomainType = {...action.todoList, filter: 'All'};

            return {
                ...state,
                todoLists: [newTodoList, ...state.todoLists]
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
        case ACTIONS_TL_TYPE.IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        default:
            return state;
    }
};

export const getTodoLists = () => (dispatch: Dispatch) => {
    todoListsAPI.getTodoLists()
        .then(resp => {
            dispatch(getTodoListsAC(resp.data));
            dispatch(isLoadingAC(false));
        });
};

export const addTodoList = (newTodoListTitle: string) => (dispatch: Dispatch) => {
    todoListsAPI.createTodoList(newTodoListTitle)
        .then(resp => {
            dispatch(addTodoListAC(resp.data.data.item));
        });
};

export const changeTitle = (id: string, title: string) => (dispatch: Dispatch) => {
    todoListsAPI.updateTodoList(id, title)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(id, title));
            }
        });
};

export const removeTodo = (id: string) => (dispatch: Dispatch) => {
    todoListsAPI.deleteTodoList(id)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(removeTodoListAC(id));
            }
        });
};