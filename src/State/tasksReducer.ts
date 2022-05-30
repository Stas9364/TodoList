import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {ActionType} from '../actions/tasksActions';
import {idTodoList1, idTodoList2} from './todoListsReducer';


export const initialState: TasksStateType = {
    [idTodoList1]: [
        {id: v1(), title: 'HTML&CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
    ],
    [idTodoList2]: [
        {id: v1(), title: 'bread', isDone: false},
        {id: v1(), title: 'meat', isDone: false},
    ]
};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {

   switch (action.type) {
       case 'ADD-NEW-TASK':
           let task = {id: v1(), title: action.title, isDone: false};
            return {
                ...state,
                [action.todoListId]: [task, ...state[action.todoListId]]
            };
       case 'CHANGE-CHECKBOX-STATUS':
           return {
               ...state,
               [action.todoListId]:
                   state[action.todoListId].map(task => task.id === action.idTask ? {...task, isDone: action.isDone} : task)
           };
       case 'CHANGE-TASK-TITLE':
           return {
               ...state,
               [action.todoListId]:
                   state[action.todoListId]
                       .map(task => task.id === action.idTask ? {...task, title: action.title} : task)
                       .filter(task => task.title)
           };
       case 'REMOVE-TASK':
           return {
               ...state,
               [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.idTask)
           };
       case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todoListId]: []
            };
       case 'REMOVE-TODOLIST':
           const copy = {...state};
           delete copy[action.id];
           return copy;
       default:
           return state;
   }
};

