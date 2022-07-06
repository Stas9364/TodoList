import {
    ACTIONS_TASKS_TYPE,
    addNewTaskAC,
    updateTaskStateAC,
    getTasksAC, removeTaskAC, TaskActionType
} from '../actions/tasksActions';
import {TaskPriorities, tasksAPI, TasksStatuses, TaskType, UpdateTaskModelType} from '../../api/tasksAPI';
import {AppStateType, AppThunk} from '../storeTodoList';
import {changeErrorAC, secondaryLoadingAC} from '../actions/appActions';
import {RequestStatusType} from "./appReducer";
import {handleNetworkError, handleServerError} from "../../utils/handleError";

export type InitialTasksStateType = {
    tasks: Array<TaskDomainType>
}
export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}
export type UpdateDomainTaskModelType = {
    title?: string
    status?: TasksStatuses
    deadline?: string
    description?: string
    priority?: TaskPriorities
    startDate?: string
    entityStatus?: RequestStatusType
}

export const initialState: InitialTasksStateType = {
    tasks: []
};

export const tasksReducer = (state: InitialTasksStateType = initialState, action: TaskActionType): InitialTasksStateType => {
    switch (action.type) {
        case ACTIONS_TASKS_TYPE.GET_TASKS:
            return {
                ...state,
                tasks: [...action.tasks, ...state.tasks]
            };
        case ACTIONS_TASKS_TYPE.ADD_NEW_TASK:
            return {
                ...state,
                tasks: [{...action.task, entityStatus: "idle"}, ...state.tasks]
            };
        case ACTIONS_TASKS_TYPE.UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.idTask
                    ? {...task, ...action.model}
                    : task
                )
            };
        case ACTIONS_TASKS_TYPE.REMOVE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.idTask)
            };
        default:
            return state;
    }
};

/////////Thunk

export const getTasks = (id: string): AppThunk => (dispatch) => {
    tasksAPI.getTasks(id)
        .then(resp => {
            if (!resp.data.error) {
                dispatch(getTasksAC(resp.data.items));
                dispatch(secondaryLoadingAC('succeeded'));
            } else {
                if (resp.data.error) {
                    dispatch(changeErrorAC(resp.data.error));
                    dispatch(secondaryLoadingAC('failed'));
                } else {
                    dispatch(changeErrorAC('Some error has occurred'));
                }
            }
        })
        .catch(e => {
            handleNetworkError(e, dispatch);
        });

};

export const createTask = (id: string, value: string): AppThunk => (dispatch) => {
    dispatch(secondaryLoadingAC('loading'));
    tasksAPI.createTask(id, value)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(addNewTaskAC(resp.data.data.item));
                dispatch(secondaryLoadingAC('succeeded'));
            } else {
                handleServerError(resp.data, dispatch);
            }
        })
        .catch(e => {
            handleNetworkError(e, dispatch);
        });

};

export const updateTaskState = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => {
    return (dispatch, getState: () => AppStateType) => {
        dispatch(secondaryLoadingAC('loading'));

        const state = getState();
        const task = state.tasksInitState.tasks.find(t => t.id === taskId);

        if (!task) {
            console.warn('Task not found in the state');
            return;
        }

        const model: UpdateTaskModelType = {
            title: task.title,
            status: task.status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            entityStatus: 'idle',
            ...domainModel
        };

        tasksAPI.updateTask(todoListId, taskId, model)
            .then(resp => {
                if (resp.data.resultCode === 0) {
                    dispatch(updateTaskStateAC(todoListId, taskId, domainModel));
                    dispatch(secondaryLoadingAC('succeeded'));
                } else {
                    handleServerError(resp.data, dispatch);
                }
            })
            .catch(e => {
                handleNetworkError(e, dispatch)
            });
    };
};

export const removeTask = (todoListId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(secondaryLoadingAC('loading'));
    dispatch(updateTaskStateAC(todoListId, taskId, {entityStatus: 'loading'}))
    tasksAPI.deleteTask(todoListId, taskId)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(removeTaskAC(todoListId, taskId));
                dispatch(secondaryLoadingAC('succeeded'));
            } else {
                handleServerError(resp.data, dispatch);
            }
        })
        .catch(e => {
            handleNetworkError(e, dispatch);
        });
};


