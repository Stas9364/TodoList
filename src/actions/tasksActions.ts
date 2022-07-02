import {TaskType} from "../api/tasksAPI";
import {UpdateDomainTaskModelType} from "../reducers/tasksReducer";

export enum ACTIONS_TASKS_TYPE {
    ADD_NEW_TASK = 'ADD-NEW-TASK',
    UPDATE_TASK = 'UPDATE-TASK',
    REMOVE_TASK = 'REMOVE-TASK',
    GET_TASKS = 'GET-TASKS'
}

export type TaskActionType =
    | ReturnType<typeof addNewTaskAC>
    | ReturnType<typeof updateTaskStateAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof getTasksAC>

export const addNewTaskAC = (task: TaskType) => ({type: ACTIONS_TASKS_TYPE.ADD_NEW_TASK, task} as const);

export const updateTaskStateAC = (todoListId: string, idTask: string, model: UpdateDomainTaskModelType) => ({
    type: ACTIONS_TASKS_TYPE.UPDATE_TASK, todoListId, idTask, model
} as const);

export const removeTaskAC = (todoListId: string, idTask: string) => ({
    type: ACTIONS_TASKS_TYPE.REMOVE_TASK, todoListId, idTask
} as const);

export const getTasksAC = (tasks: Array<TaskType>) => ({type: ACTIONS_TASKS_TYPE.GET_TASKS, tasks} as const);