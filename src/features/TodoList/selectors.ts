import {RootState} from '../../reduxStore/storeTodoList';

export const todoListsSelector = (state: RootState) => state.todoLists.todoLists;