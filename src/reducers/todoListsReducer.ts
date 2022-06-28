import {
    ACTIONS_TL_TYPE,
    ActionsType,
    addTodoListAC,
    changeTodoListTitleAC,
    getTodoListsAC, removeTodoListAC
} from '../actions/todoListsActions';
import {Dispatch} from "redux";
import {todoListsAPI, TodoListType} from "../TodoList/todoListsAPI";

export type InitialStateType = {
    todoLists: Array<TodoListType>
}

export const initialState: InitialStateType = {
    todoLists: [],
}

export const todoListsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ACTIONS_TL_TYPE.REMOVE_TODOLIST:
            return {
                ...state,
                todoLists: state.todoLists.filter(el => el.id !== action.id)
            }
        case ACTIONS_TL_TYPE.ADD_TODOLIST:
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.newTodoListTitle,
                addedDate: action.addedDate,
                order: action.order,
                filter: 'All'
            };
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
        default:
            return state;
    }
};

export const getTodoLists = () => (dispatch: Dispatch) => {
    todoListsAPI.getTodoLists()
        .then(resp => {
            dispatch(getTodoListsAC(resp.data));
        });
};

export const addTodoList = (newTodoListTitle: string) => (dispatch: Dispatch) => {
    todoListsAPI.createTodoList(newTodoListTitle)
        .then(resp => {
            dispatch(addTodoListAC(newTodoListTitle, resp.data.data.item.id, resp.data.data.item.addedDate, resp.data.data.item.order));
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