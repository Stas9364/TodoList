import {FilterValueType} from '../TodoList/Todolist';
import {TodoListType} from "../TodoList/todoListsAPI";

export enum ACTIONS_TL_TYPE {
    REMOVE_TODOLIST = 'REMOVE-TODOLIST',
    ADD_TODOLIST = 'ADD-TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE-TITLE',
    CHANGE_FILTER_VALUE = 'CHANGE-FILTER-VALUE',
    GET_TODO_LISTS = 'GET-TODO-LISTS'
}

export type ActionsType = RemoveTodoList | AddTodoList | ChangeTodoListTitle | ChangeFilterValue | GetTodoLists;
export type RemoveTodoList = {
    type: ACTIONS_TL_TYPE.REMOVE_TODOLIST
    id: string
}
export type AddTodoList = {
    type: ACTIONS_TL_TYPE.ADD_TODOLIST
    newTodoListTitle: string
    todoListId: string
    addedDate: string
    order: number

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

export const removeTodoListAC = (todoListId: string): RemoveTodoList => {
    return {
        type: ACTIONS_TL_TYPE.REMOVE_TODOLIST,
        id: todoListId
    };
};
export const addTodoListAC = (newTodoListTitle: string, todoListID: string, addedDate: string, order: number): AddTodoList => {
    return {
        type: ACTIONS_TL_TYPE.ADD_TODOLIST,
        newTodoListTitle,
        todoListId: todoListID,
        addedDate,
        order
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