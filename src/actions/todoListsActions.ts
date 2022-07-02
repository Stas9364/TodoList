import {FilterValueType} from '../TodoList/Todolist';
import {TodoListType} from "../api/todoListsAPI";

export enum ACTIONS_TL_TYPE {
    REMOVE_TODOLIST = 'REMOVE-TODOLIST',
    ADD_TODOLIST = 'ADD-TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE-TITLE',
    CHANGE_FILTER_VALUE = 'CHANGE-FILTER-VALUE',
    GET_TODO_LISTS = 'GET-TODO-LISTS',
    IS_LOADING = 'IS-LOADING'
}

export type TodoListActionsType =
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterValueAC>
    | ReturnType<typeof getTodoListsAC>
    | ReturnType<typeof isLoadingAC>

export const removeTodoListAC = (id: string) => ({type: ACTIONS_TL_TYPE.REMOVE_TODOLIST, id} as const);

export const addTodoListAC = (todoList: TodoListType) => ({type: ACTIONS_TL_TYPE.ADD_TODOLIST, todoList} as const);

export const changeTodoListTitleAC = (id: string, title: string) => ({
    type: ACTIONS_TL_TYPE.CHANGE_TODOLIST_TITLE, id, title
} as const);

export const changeTodoListFilterValueAC = (id: string, filter: FilterValueType) => ({
    type: ACTIONS_TL_TYPE.CHANGE_FILTER_VALUE, id, filter
} as const);

export const getTodoListsAC = (todoLists: Array<TodoListType>) => ({
    type: ACTIONS_TL_TYPE.GET_TODO_LISTS,
    todoLists
} as const);

export const isLoadingAC = (isLoading: boolean) => ({type: ACTIONS_TL_TYPE.IS_LOADING, isLoading} as const);