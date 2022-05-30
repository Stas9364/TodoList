import {v1} from 'uuid';
import {FilterValueType} from '../TodoList/Todolist';

export enum ACTIONS_TYPE {
    REMOVE_TODOLIST = 'REMOVE-TODOLIST',
    ADD_TODOLIST = 'ADD-TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE-TITLE',
    CHANGE_FILTER_VALUE = 'CHANGE-FILTER-VALUE'
}

export type ActionsType = RemoveTodoList | AddTodoList | ChangeTodoListTitle | ChangeFilterValue;
export type RemoveTodoList = {
    type: ACTIONS_TYPE.REMOVE_TODOLIST
    id: string
}
export type AddTodoList = {
    type: ACTIONS_TYPE.ADD_TODOLIST
    newTodoListTitle: string
    todoListId: string
}
type ChangeTodoListTitle = {
    id: string
    title: string
    type: ACTIONS_TYPE.CHANGE_TODOLIST_TITLE
}
type ChangeFilterValue = {
    id: string
    filter: FilterValueType
    type: ACTIONS_TYPE.CHANGE_FILTER_VALUE
}


export const removeTodoListAC = (todoListId: string): RemoveTodoList => {
    return {
        type: ACTIONS_TYPE.REMOVE_TODOLIST,
        id: todoListId
    };
};
export const addTodoListAC = (newTodoListTitle: string): AddTodoList => {
    return {
        type: ACTIONS_TYPE.ADD_TODOLIST,
        newTodoListTitle,
        todoListId: v1()
    };
};
export const changeTodoListTitleAC = (todoListId: string, title: string): ChangeTodoListTitle => {
    return {
        type: ACTIONS_TYPE.CHANGE_TODOLIST_TITLE,
        id: todoListId,
        title
    };
};
export const changeTodoListFilterValueAC = (todoListId: string, filter: FilterValueType): ChangeFilterValue => {
    return {
        type: ACTIONS_TYPE.CHANGE_FILTER_VALUE,
        id: todoListId,
        filter
    };
};