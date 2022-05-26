import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodoList, idTodoList1, idTodoList2, RemoveTodoList} from './todoListsReducer';

type AddNewTasksType = {
    type: 'ADD-NEW-TASK'
    todoListId: string
    title: string
}
type ChangeCheckBoxStatusType = {
    type: 'CHANGE-CHECKBOX-STATUS'
    todoListId: string
    idTask: string
    isDone: boolean
}
type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    todoListId: string
    idTask: string
    title: string
}
type RemoveTaskType = {
    type: 'REMOVE-TASK'
    todoListId: string
    idTask: string
}
type ActionType =
    AddNewTasksType |
    ChangeCheckBoxStatusType |
    ChangeTaskTitleType |
    RemoveTaskType |
    AddTodoList |
    RemoveTodoList;

const initialState: TasksStateType = {
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

export const addNewTaskAC = (todoListId: string, title: string): AddNewTasksType => {
    return {
        type: 'ADD-NEW-TASK',
        todoListId,
        title
    };
};
export const changeCheckboxStatusAC = (todoListId: string, idTask: string, isDone: boolean): ChangeCheckBoxStatusType => {
    return {
        type: 'CHANGE-CHECKBOX-STATUS',
        todoListId,
        idTask,
        isDone
    };
};
export const changeTaskTitleAC = (todoListId: string, idTask: string, title: string): ChangeTaskTitleType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todoListId,
        idTask,
        title
    };
};
export const removeTaskAC = (todoListId: string, idTask: string): RemoveTaskType => {
    return {
        type: 'REMOVE-TASK',
        todoListId,
        idTask
    };
};
