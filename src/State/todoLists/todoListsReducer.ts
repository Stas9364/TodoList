import {TodoListsType} from '../../App';
import {v1} from 'uuid';
import {ActionsType} from './todoListsActions';


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

