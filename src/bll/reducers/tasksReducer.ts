import {TaskPriorities, tasksAPI, TasksStatuses, TaskType, UpdateTaskModelType} from '../../api/tasksAPI';
import {RootState} from '../storeTodoList';
import {changeError, RequestStatusType, secondaryLoading} from './appReducer';
import {handleNetworkError, handleServerError} from '../../utils/handleError';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
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

//////THUNKS

export const getTasks = createAsyncThunk(
    'tasks/getTasks',
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'loading'}));
        try {
            const resp = await tasksAPI.getTasks(id);
            if (!resp.data.error) {
                thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
                return {tasks: resp.data.items};
            } else {
                if (resp.data.error) {
                    thunkAPI.dispatch(changeError({error: resp.data.error}));
                    thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'failed'}));
                } else {
                    thunkAPI.dispatch(changeError({error: 'Some error has occurred'}));
                }
            }
        } catch (e) {
            handleNetworkError(e, thunkAPI.dispatch);
        }
    }
);

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (param: { id: string, value: string }, thunkAPI) => {
        thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'loading'}));
        try {
            const resp = await tasksAPI.createTask(param.id, param.value);
            if (resp.data.resultCode === 0) {
                thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
                return {task: resp.data.data.item};
            } else {
                handleServerError(resp.data, thunkAPI.dispatch);
            }
        } catch (e) {
            handleNetworkError(e, thunkAPI.dispatch);
        }
    }
);

export const removeTask = createAsyncThunk(
    'tasks/removeTask',
    async (param: { todoListId: string, taskId: string }, thunkAPI) => {
        thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'loading'}));
        try {
            const resp = await tasksAPI.deleteTask(param.todoListId, param.taskId);
            if (resp.data.resultCode === 0) {
                thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
                return {idTask: param.taskId};
            } else {
                handleServerError(resp.data, thunkAPI.dispatch);
            }
        } catch (e) {
            handleNetworkError(e, thunkAPI.dispatch);
        }
    }
);

export const updateTaskState = createAsyncThunk(
    'tasks/updateTaskState',
    async (param: { todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType }, thunkAPI) => {
        thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'loading'}));

        const state = thunkAPI.getState() as RootState;

        const task = state.tasks.tasks.find(t => t.id === param.taskId);

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
            ...param.domainModel
        };

        try {
            const resp = await tasksAPI.updateTask(param.todoListId, param.taskId, model);
            if (resp.data.resultCode === 0) {
                thunkAPI.dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
                return {idTask: param.taskId, model: param.domainModel};
            } else {
                handleServerError(resp.data, thunkAPI.dispatch);
            }
        } catch (e) {
            handleNetworkError(e, thunkAPI.dispatch);
        }
    }
);

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(clearTodoListsDataAC, state => {
            state.tasks.length = 0;
        });
        builder.addCase(getTasks.fulfilled, (state, action) => {
            if (action.payload) {
                state.tasks.push(...action.payload.tasks);
            }
        });
        builder.addCase(createTask.fulfilled, (state, action) => {
            if (action.payload) {
                state.tasks.unshift(action.payload.task);
            }
        });
        builder.addCase(removeTask.fulfilled, (state, action) => {
            if (action.payload) {
                const index = state.tasks.findIndex(task => task.id === action.payload?.idTask);
                if (index !== -1) {
                    state.tasks.splice(index, 1);
                }
            }
        });
        builder.addCase(updateTaskState.fulfilled, (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload?.idTask);
            if (index !== -1) {
                state.tasks[index] = {...state.tasks[index], ...action.payload?.model};
            }
        });
    }
});

export const tasksReducer = slice.reducer;
/////////Thunk

// export const getTasks_ = (id: string) => (dispatch: AppDispatch) => {
//     dispatch(secondaryLoading({secondaryLoading: 'loading'}));
//
//     tasksAPI.getTasks(id)
//         .then(resp => {
//             if (!resp.data.error) {
//                 dispatch(getTasksAC({tasks: resp.data.items}));
//                 dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
//             } else {
//                 if (resp.data.error) {
//                     dispatch(changeError({error: resp.data.error}));
//                     dispatch(secondaryLoading({secondaryLoading: 'failed'}));
//                 } else {
//                     dispatch(changeError({error: 'Some error has occurred'}));
//                 }
//             }
//         })
//         .catch(e => {
//             handleNetworkError(e, dispatch);
//         });
// };

// export const createTask_ = (id: string, value: string) => (dispatch: AppDispatch) => {
//     dispatch(secondaryLoading({secondaryLoading: 'loading'}));
//
//     tasksAPI.createTask(id, value)
//         .then(resp => {
//             if (resp.data.resultCode === 0) {
//                 dispatch(addNewTaskAC({task: resp.data.data.item}));
//                 dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
//             } else {
//                 handleServerError(resp.data, dispatch);
//             }
//         })
//         .catch(e => {
//             handleNetworkError(e, dispatch);
//         });
// };

// export const updateTaskState_ = (todoListId: string, idTask: string, domainModel: UpdateDomainTaskModelType) => {
//     return (dispatch: AppDispatch, getState: () => RootState) => {
//         dispatch(secondaryLoading({secondaryLoading: 'loading'}));
//
//         const state = getState();
//         const task = state.tasks.tasks.find(t => t.id === idTask);
//
//         if (!task) {
//             console.warn('Task not found in the state');
//             return;
//         }
//
//         const model: UpdateTaskModelType = {
//             title: task.title,
//             status: task.status,
//             deadline: task.deadline,
//             description: task.description,
//             priority: task.priority,
//             startDate: task.startDate,
//             entityStatus: 'idle',
//             ...domainModel
//         };
//
//         tasksAPI.updateTask(todoListId, idTask, model)
//             .then(resp => {
//                 if (resp.data.resultCode === 0) {
//                     dispatch(updateTaskStateAC({idTask, model: domainModel}));
//                     dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
//                 } else {
//                     handleServerError(resp.data, dispatch);
//                 }
//             })
//             .catch(e => {
//                 handleNetworkError(e, dispatch);
//             });
//     };
// };

// export const removeTask_ = (todoListId: string, idTask: string) => (dispatch: AppDispatch) => {
//     dispatch(secondaryLoading({secondaryLoading: 'loading'}));
//     dispatch(updateTaskStateAC({idTask, model: {entityStatus: 'loading'}}));
//
//     tasksAPI.deleteTask(todoListId, idTask)
//         .then(resp => {
//             if (resp.data.resultCode === 0) {
//                 dispatch(removeTaskAC({idTask}));
//                 dispatch(secondaryLoading({secondaryLoading: 'succeeded'}));
//             } else {
//                 handleServerError(resp.data, dispatch);
//             }
//         })
//         .catch(e => {
//             handleNetworkError(e, dispatch);
//         });
// };


