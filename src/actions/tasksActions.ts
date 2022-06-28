import {AddTodoList, RemoveTodoList} from './todoListsActions';
import {TaskType} from "../Task/tasksAPI";

export enum ACTIONS_TASKS_TYPE {
    ADD_NEW_TASK = 'ADD-NEW-TASK',
    CHANGE_CHECKBOX_STATUS = 'CHANGE-CHECKBOX-STATUS',
    CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE',
    REMOVE_TASK = 'REMOVE-TASK',
    GET_TASKS = 'GET-TASKS'
}

export type TaskActionType =
    AddNewTasksType |
    ChangeCheckBoxStatusType |
    ChangeTaskTitleType |
    RemoveTaskType |
    AddTodoList |
    RemoveTodoList |
    GetTaskType;

type AddNewTasksType = {
    type: ACTIONS_TASKS_TYPE.ADD_NEW_TASK
    task: TaskType
};
type ChangeCheckBoxStatusType = {
    type: ACTIONS_TASKS_TYPE.CHANGE_CHECKBOX_STATUS
    todoListId: string
    idTask: string
    status: number
};
type ChangeTaskTitleType = {
    type: ACTIONS_TASKS_TYPE.CHANGE_TASK_TITLE
    todoListId: string
    idTask: string
    title: string
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
export const changeCheckboxStatusAC = (todoListId: string, idTask: string, status: number): ChangeCheckBoxStatusType => {
    return {
        type: ACTIONS_TASKS_TYPE.CHANGE_CHECKBOX_STATUS,
        todoListId,
        idTask,
        status
    };
};
export const changeTaskTitleAC = (todoListId: string, idTask: string, title: string): ChangeTaskTitleType => {
    return {
        type: ACTIONS_TASKS_TYPE.CHANGE_TASK_TITLE,
        todoListId,
        idTask,
        title
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
        type : ACTIONS_TASKS_TYPE.GET_TASKS,
        tasks
    };
};