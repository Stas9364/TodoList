import {
    ACTIONS_TASKS_TYPE,
    TaskActionType,
    addNewTaskAC,
    changeCheckboxStatusAC, changeTaskTitleAC,
    getTasksAC, removeTaskAC
} from '../actions/tasksActions';
import {tasksAPI, TaskType} from "../Task/tasksAPI";
import {Dispatch} from "redux";

export type InitialTasksStateType = {
    tasks: Array<TaskType>
}

export const initialState: InitialTasksStateType = {
    tasks: []
}

export const tasksReducer = (state: InitialTasksStateType = initialState, action: TaskActionType): InitialTasksStateType => {
    switch (action.type) {
       case ACTIONS_TASKS_TYPE.GET_TASKS: {
           return {
               ...state,
               tasks: [...action.tasks, ...state.tasks]
           }
       }
       case ACTIONS_TASKS_TYPE.ADD_NEW_TASK:
            return {
                ...state,
                tasks: [action.task, ...state.tasks]
            }
       case ACTIONS_TASKS_TYPE.CHANGE_CHECKBOX_STATUS:
           return {
               ...state,
               tasks: state.tasks.map(task => task.id === action.idTask
                       ? {...task, status: action.status}
                       : task
                   )
           };
       case ACTIONS_TASKS_TYPE.CHANGE_TASK_TITLE:
           return {
               ...state,
               tasks: state.tasks
                   .map(t => t.id === action.idTask && t.todoListId === action.todoListId
                       ? {...t, title: action.title}
                       : t
                   )
                   .filter(task => task.title)
           };
       case ACTIONS_TASKS_TYPE.REMOVE_TASK:
           return {
               ...state,
               tasks: state.tasks.filter(task => task.id !== action.idTask)
           }
       default:
           return state;
   }
};


export const getTasks = (id: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(id)
        .then(resp => {
            dispatch(getTasksAC(resp.data.items))
        });
};

export const createTask = (id: string, value: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(id, value)
        .then(resp => dispatch(addNewTaskAC(resp.data.data.item)));
};

export  const changeCheckbox = (todoListId: string, taskId: string, taskTitle: string, statusVal: number) => (dispatch: Dispatch) => {
    tasksAPI.updateTask(todoListId, taskId, taskTitle, statusVal)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(changeCheckboxStatusAC(todoListId, taskId, statusVal));
            }
        });
};

export const changeTaskTitle = (todoListId: string, taskId: string, title: string, status: number) => (dispatch: Dispatch) => {
    tasksAPI.updateTask(todoListId, taskId, title, status)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(changeTaskTitleAC(todoListId, taskId, title))
            }
        })
};

export const removeTask = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todoListId, taskId)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(removeTaskAC(todoListId, taskId))
            }
        });
};