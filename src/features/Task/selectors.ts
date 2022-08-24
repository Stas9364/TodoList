import {RootState} from '../../reduxStore/storeTodoList';

export const tasksSelector = (state: RootState) => state.tasks.tasks;
export const getTodoListTasks = (state: RootState, todoListId: string) => {
    return tasksSelector(state).filter(t => t.todoListId === todoListId);
};
