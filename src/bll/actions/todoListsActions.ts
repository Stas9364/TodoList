import {FilterValueType} from '../../components/TodoList/Todolist';
import {TodoListType} from "../../api/todoListsAPI";
import {RequestStatusType} from "../reducers/appReducer";

export enum ACTIONS_TL_TYPE {
    REMOVE_TODOLIST = 'REMOVE-TODOLIST',
    ADD_TODOLIST = 'ADD-TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE-TITLE',
    CHANGE_FILTER_VALUE = 'CHANGE-FILTER-VALUE',
    GET_TODO_LISTS = 'GET-TODO-LISTS',
    CHANGE_ENTITY_STATUS = 'CHANGE-ENTITY-STATUS'
}

export type TodoListActionsType =
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterValueAC>
    | ReturnType<typeof changeEntityStatusAC>
    | ReturnType<typeof getTodoListsAC>

export const removeTodoListAC = (id: string) => ({type: ACTIONS_TL_TYPE.REMOVE_TODOLIST, id} as const);

export const addTodoListAC = (todoList: TodoListType) => ({type: ACTIONS_TL_TYPE.ADD_TODOLIST, todoList} as const);

export const changeTodoListTitleAC = (id: string, title: string) => ({
    type: ACTIONS_TL_TYPE.CHANGE_TODOLIST_TITLE, id, title
} as const);

export const changeTodoListFilterValueAC = (id: string, filter: FilterValueType) => ({
    type: ACTIONS_TL_TYPE.CHANGE_FILTER_VALUE, id, filter
} as const);

export const changeEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: ACTIONS_TL_TYPE.CHANGE_ENTITY_STATUS, id, status
} as const);

export const getTodoListsAC = (todoLists: Array<TodoListType>) => ({
    type: ACTIONS_TL_TYPE.GET_TODO_LISTS,
    todoLists
} as const);

