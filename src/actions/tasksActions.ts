import {AddTodoList, RemoveTodoList} from './todoListsActions';

export enum ACTIONS_TYPE {
    ADD_NEW_TASK_TYPE = 'ADD-NEW-TASK',
    CHANGE_CHECKBOX_STATUS_TYPE = 'CHANGE-CHECKBOX-STATUS',
    CHANGE_TASK_TITLE_TYPE = 'CHANGE-TASK-TITLE',
    REMOVE_TASK_TYPE = 'REMOVE-TASK'
}

export type ActionType =
    AddNewTasksType |
    ChangeCheckBoxStatusType |
    ChangeTaskTitleType |
    RemoveTaskType |
    AddTodoList |
    RemoveTodoList;
type AddNewTasksType = {
    type: ACTIONS_TYPE.ADD_NEW_TASK_TYPE
    todoListId: string
    title: string
}
type ChangeCheckBoxStatusType = {
    type: ACTIONS_TYPE.CHANGE_CHECKBOX_STATUS_TYPE
    todoListId: string
    idTask: string
    isDone: boolean
}
type ChangeTaskTitleType = {
    type: ACTIONS_TYPE.CHANGE_TASK_TITLE_TYPE
    todoListId: string
    idTask: string
    title: string
}
type RemoveTaskType = {
    type: ACTIONS_TYPE.REMOVE_TASK_TYPE
    todoListId: string
    idTask: string
}


export const addNewTaskAC = (todoListId: string, title: string): AddNewTasksType => {
    return {
        type: ACTIONS_TYPE.ADD_NEW_TASK_TYPE,
        todoListId,
        title
    };
};
export const changeCheckboxStatusAC = (todoListId: string, idTask: string, isDone: boolean): ChangeCheckBoxStatusType => {
    return {
        type: ACTIONS_TYPE.CHANGE_CHECKBOX_STATUS_TYPE,
        todoListId,
        idTask,
        isDone
    };
};
export const changeTaskTitleAC = (todoListId: string, idTask: string, title: string): ChangeTaskTitleType => {
    return {
        type: ACTIONS_TYPE.CHANGE_TASK_TITLE_TYPE,
        todoListId,
        idTask,
        title
    };
};
export const removeTaskAC = (todoListId: string, idTask: string): RemoveTaskType => {
    return {
        type: ACTIONS_TYPE.REMOVE_TASK_TYPE,
        todoListId,
        idTask
    };
};
