import {FilterValueType} from '../TodoList/Todolist';
import {TodoListType} from "../TodoList/todoListsAPI";

export enum ACTIONS_TL_TYPE {
    REMOVE_TODOLIST = 'REMOVE-TODOLIST',
    ADD_TODOLIST = 'ADD-TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE-TITLE',
    CHANGE_FILTER_VALUE = 'CHANGE-FILTER-VALUE',
    GET_TODO_LISTS = 'GET-TODO-LISTS',
    IS_LOADING = 'IS-LOADING'
}

export type ActionsType =
    RemoveTodoList
    | AddTodoList
    | ChangeTodoListTitle
    | ChangeFilterValue
    | GetTodoLists
    | IsLoading;
export type RemoveTodoList = {
    type: ACTIONS_TL_TYPE.REMOVE_TODOLIST
    id: string
}
export type AddTodoList = {
    type: ACTIONS_TL_TYPE.ADD_TODOLIST
    todoList: TodoListType
}
type ChangeTodoListTitle = {
    id: string
    title: string
    type: ACTIONS_TL_TYPE.CHANGE_TODOLIST_TITLE
}
type ChangeFilterValue = {
    id: string
    filter: FilterValueType
    type: ACTIONS_TL_TYPE.CHANGE_FILTER_VALUE
}
type GetTodoLists = {
    type: ACTIONS_TL_TYPE.GET_TODO_LISTS
    todoLists: Array<TodoListType>
}
type IsLoading = {
    type: ACTIONS_TL_TYPE.IS_LOADING
    isLoading: boolean
}

export const removeTodoListAC = (todoListId: string): RemoveTodoList => {
    return {
        type: ACTIONS_TL_TYPE.REMOVE_TODOLIST,
        id: todoListId
    };
};
export const addTodoListAC = (todoList: TodoListType): AddTodoList => {
    return {
        type: ACTIONS_TL_TYPE.ADD_TODOLIST,
        todoList
    };
};
export const changeTodoListTitleAC = (todoListId: string, title: string): ChangeTodoListTitle => {
    return {
        type: ACTIONS_TL_TYPE.CHANGE_TODOLIST_TITLE,
        id: todoListId,
        title
    };
};
export const changeTodoListFilterValueAC = (todoListId: string, filter: FilterValueType): ChangeFilterValue => {
    return {
        type: ACTIONS_TL_TYPE.CHANGE_FILTER_VALUE,
        id: todoListId,
        filter
    };
};
export const getTodoListsAC = (todoLists: Array<TodoListType>): GetTodoLists => {
    return {
        type: ACTIONS_TL_TYPE.GET_TODO_LISTS,
        todoLists
    };
};
export const isLoadingAC = (value: boolean): IsLoading => {
    return {
        type: ACTIONS_TL_TYPE.IS_LOADING,
        isLoading: value
    };
};