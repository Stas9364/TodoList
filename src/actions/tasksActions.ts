import {AddTodoList, RemoveTodoList} from './todoListsActions';
import {TaskType} from "../Task/tasksAPI";
import {UpdateDomainTaskModelType} from "../reducers/tasksReducer";

export enum ACTIONS_TASKS_TYPE {
    ADD_NEW_TASK = 'ADD-NEW-TASK',
    UPDATE_TASK = 'UPDATE-TASK',
    REMOVE_TASK = 'REMOVE-TASK',
    GET_TASKS = 'GET-TASKS'
}

export type TaskActionType =
    AddNewTasksType |
    UpdateTaskType |
    RemoveTaskType |
    AddTodoList |
    RemoveTodoList |
    GetTaskType;

type AddNewTasksType = {
    type: ACTIONS_TASKS_TYPE.ADD_NEW_TASK
    task: TaskType
};
type UpdateTaskType = {
    type: ACTIONS_TASKS_TYPE.UPDATE_TASK
    todoListId: string
    idTask: string
    model: UpdateDomainTaskModelType
};
type RemoveTaskType = {
    type: ACTIONS_TASKS_TYPE.REMOVE_TASK
    todoListId: string
    idTask: string
};
type GetTaskType = {
    type: ACTIONS_TASKS_TYPE.GET_TASKS
    tasks: Array<TaskType>
};


export const addNewTaskAC = (task: TaskType): AddNewTasksType => {
    return {
        type: ACTIONS_TASKS_TYPE.ADD_NEW_TASK,
        task
    };
};
export const updateTaskStateAC = (todoListId: string, idTask: string, model: UpdateDomainTaskModelType): UpdateTaskType => {
    return {
        type: ACTIONS_TASKS_TYPE.UPDATE_TASK,
        todoListId,
        idTask,
        model
    };
};
export const removeTaskAC = (todoListId: string, idTask: string): RemoveTaskType => {
    return {
        type: ACTIONS_TASKS_TYPE.REMOVE_TASK,
        todoListId,
        idTask
    };
};
export const getTasksAC = (tasks: Array<TaskType>): GetTaskType => {
    return {
        type: ACTIONS_TASKS_TYPE.GET_TASKS,
        tasks
    };
};