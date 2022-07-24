import {TaskPriorities, tasksAPI, TasksStatuses, TaskType, UpdateTaskModelType} from '../../api/tasksAPI';
import {AppDispatch, RootState} from '../storeTodoList';
import {changeError, RequestStatusType, secondaryLoading} from './appReducer';
import {handleNetworkError, handleServerError} from '../../utils/handleError';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearTodoListsDataAC} from './todoListsReducer';

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


const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addNewTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state.tasks.unshift({...action.payload.task});
        },
        updateTaskStateAC(state, action: PayloadAction<{ idTask: string, model: UpdateDomainTaskModelType }>) {
            const index = state.tasks.findIndex(task => task.id === action.payload.idTask);
            if (index !== -1) {
                state.tasks[index] = {...state.tasks[index], ...action.payload.model};
            }
        },
        removeTaskAC(state, action: PayloadAction<{ idTask: string }>) {
            const index = state.tasks.findIndex(task => task.id === action.payload.idTask);
            if (index !== -1) {
                state.tasks.splice(index, 1);
            }
        },
        getTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType> }>) {
            state.tasks.push(...action.payload.tasks);
        },
    },
    extraReducers(builder) {
        builder.addCase(clearTodoListsDataAC, state => {
            state.tasks.length = 0;
        })
    }
});

export const tasksReducer = slice.reducer;
export const {addNewTaskAC, updateTaskStateAC, removeTaskAC, getTasksAC} = slice.actions;

/////////Thunk

export const getTasks = (id: string) => (dispatch: AppDispatch) => {
    dispatch(secondaryLoading({secondaryLoading: 'loading'}));

    tasksAPI.getTasks(id)
        .then(resp => {
            if (!resp.data.error) {
                dispatch(getTasksAC({tasks: resp.data.items}));
                dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
            } else {
                if (resp.data.error) {
                    dispatch(changeError({error: resp.data.error}));
                    dispatch(secondaryLoading({secondaryLoading: 'failed'}));
                } else {
                    dispatch(changeError({error: 'Some error has occurred'}));
                }
            }
        })
        .catch(e => {
            handleNetworkError(e, dispatch);
        });
};

export const createTask = (id: string, value: string) => (dispatch: AppDispatch) => {
    dispatch(secondaryLoading({secondaryLoading: 'loading'}));

    tasksAPI.createTask(id, value)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(addNewTaskAC({task: resp.data.data.item}));
                dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
            } else {
                handleServerError(resp.data, dispatch);
            }
        })
        .catch(e => {
            handleNetworkError(e, dispatch);
        });
};

export const updateTaskState = (todoListId: string, idTask: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(secondaryLoading({secondaryLoading: 'loading'}));

        const state = getState();
        const task = state.tasks.tasks.find(t => t.id === idTask);

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

        tasksAPI.updateTask(todoListId, idTask, model)
            .then(resp => {
                if (resp.data.resultCode === 0) {
                    dispatch(updateTaskStateAC({idTask, model: domainModel}));
                    dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
                } else {
                    handleServerError(resp.data, dispatch);
                }
            })
            .catch(e => {
                handleNetworkError(e, dispatch);
            });
    };
};

export const removeTask = (todoListId: string, idTask: string) => (dispatch: AppDispatch) => {
    dispatch(secondaryLoading({secondaryLoading: 'loading'}));
    dispatch(updateTaskStateAC({idTask, model: {entityStatus: 'loading'}}));

    tasksAPI.deleteTask(todoListId, idTask)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(removeTaskAC({idTask}));
                dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
            } else {
                handleServerError(resp.data, dispatch);
            }
        })
        .catch(e => {
            handleNetworkError(e, dispatch);
        });
};


