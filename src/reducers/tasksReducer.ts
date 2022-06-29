import {
    ACTIONS_TASKS_TYPE,
    TaskActionType,
    addNewTaskAC,
    updateTaskStateAC,
    getTasksAC, removeTaskAC
} from '../actions/tasksActions';
import {TaskPriorities, tasksAPI, TasksStatuses, TaskType, UpdateTaskModelType} from "../Task/tasksAPI";
import {Dispatch} from "redux";
import {AppStateType} from "../storeRedux/storeTodoList";

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
        case ACTIONS_TASKS_TYPE.UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.idTask && task.todoListId === action.todoListId
                    ? {...task, ...action.model}
                    : task
                )
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

export type UpdateDomainTaskModelType = {
    title?: string
    status?: TasksStatuses
    deadline?: string
    description?: string
    priority?: TaskPriorities
    startDate?: string
}

export const updateTaskState = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {

    return (dispatch: Dispatch, getState: ()=>AppStateType) => {
        const state = getState();
        const task = state.tasksInitState.tasks.find(t => t.todoListId === todoListId);

        if (!task) {
            console.warn('Task not found in the state');
            return
        }

        const model: UpdateTaskModelType = {
            title: task.title,
            status: task.status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            ...domainModel
        };

        tasksAPI.updateTask(todoListId, taskId, model)
            .then(resp => {
                if (resp.data.resultCode === 0) {
                    dispatch(updateTaskStateAC(todoListId, taskId, domainModel));
                }
            });
    };
};

export const removeTask = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todoListId, taskId)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(removeTaskAC(todoListId, taskId))
            }
        });
};