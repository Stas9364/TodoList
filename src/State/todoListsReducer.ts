import {TodoListsType} from '../App';
import {FilterValueType} from '../TodoList/Todolist';
import {v1} from 'uuid';

type ActionsType = RemoveTodoList | AddTodoList | ChangeTodoListTitle | ChangeFilterValue;
export type RemoveTodoList = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoList = {
    type: 'ADD-TODOLIST'
    newTodoListTitle: string
    todoListId: string
}
type ChangeTodoListTitle = {
    id: string
    title: string
    type: 'CHANGE-TITLE'
}
type ChangeFilterValue = {
    id: string
    filter: FilterValueType
    type: 'CHANGE-FILTER-VALUE'
}

export const idTodoList1 = v1();
export const idTodoList2 = v1();

export const initialState: TodoListsType[] = [
    {id: idTodoList1, filter: 'Active', title: 'What to do'},
    {id: idTodoList2, filter: 'All', title: 'What to buy'}
];

export const todoListsReducer = (state: Array<TodoListsType> = initialState, action: ActionsType): Array<TodoListsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id);
        case 'ADD-TODOLIST':
            const newTodoList: TodoListsType = {id: action.todoListId, filter: 'All', title: action.newTodoListTitle};
            return [...state, newTodoList];
        case 'CHANGE-TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el);
        case 'CHANGE-FILTER-VALUE':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el);
        default:
            return state;
    }
};

export const removeTodoListAC = (todoListId: string): RemoveTodoList => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todoListId
    };
};
export const addTodoListAC = (newTodoListTitle: string): AddTodoList => {
    return {
        type: 'ADD-TODOLIST',
        newTodoListTitle,
        todoListId: v1()
    };
};
export const changeTodoListTitleAC = (todoListId: string, title: string): ChangeTodoListTitle => {
    return {
        type: 'CHANGE-TITLE',
        id: todoListId,
        title
    };
};
export const changeTodoListFilterValueAC = (todoListId: string, filter: FilterValueType): ChangeFilterValue => {
    return {
        type: 'CHANGE-FILTER-VALUE',
        id: todoListId,
        filter
    };
};