import {FilterValueType} from '../../components/TodoList/Todolist';
import {TodoListType} from "../../api/todoListsAPI";
import {RequestStatusType} from "../reducers/appReducer";

export enum ACTIONS_TL_TYPE {
    REMOVE_TODOLIST = 'REMOVE-TODOLIST',
    ADD_TODOLIST = 'ADD-TODOLIST',
    GET_TODO_LISTS = 'GET-TODO-LISTS',
    UPDATE_TODO_LIST_STATE = 'UPDATE-TODO-LIST-STATE'
}
export type UpdateDomainTodoListModelType = {
    title?: string
    filter?: FilterValueType
    entityStatus?: RequestStatusType
}


export type TodoListActionsType =
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof getTodoListsAC>
    | ReturnType<typeof updateTodoListStateAC>

export const removeTodoListAC = (id: string) => ({type: ACTIONS_TL_TYPE.REMOVE_TODOLIST, id} as const);

export const addTodoListAC = (todoList: TodoListType) => ({type: ACTIONS_TL_TYPE.ADD_TODOLIST, todoList} as const);

export const getTodoListsAC = (todoLists: Array<TodoListType>) => ({type: ACTIONS_TL_TYPE.GET_TODO_LISTS, todoLists} as const);

export const updateTodoListStateAC = (id: string, model: UpdateDomainTodoListModelType) => ({
    type: ACTIONS_TL_TYPE.UPDATE_TODO_LIST_STATE, id, model
} as const);
