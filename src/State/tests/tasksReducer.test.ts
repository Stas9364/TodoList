import {v1} from 'uuid';
import {TasksStateType} from '../../App';
import {
    addNewTaskAC,
    changeCheckboxStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from '../tasks/tasksReducer';
import {addTodoListAC, idTodoList1, idTodoList2, removeTodoListAC} from '../todoLists/todoListsReducer';

const id1 = v1();
const id2 = v1();
const id3 = v1();
const id4 = v1();
const id5 = v1();
const id1_1 = v1();
const id1_2 = v1();

const startState: TasksStateType = {
    [idTodoList1]: [
        {id: id1, title: 'HTML&CSS', isDone: false},
        {id: id2, title: 'JS', isDone: false},
        {id: id3, title: 'ReactJS', isDone: false},
        {id: id4, title: 'GraphQL', isDone: false},
        {id: id5, title: 'Rest API', isDone: false},
    ],
    [idTodoList2]: [
        {id: id1_1, title: 'bread', isDone: false},
        {id: id1_2, title: 'meat', isDone: false},
    ]
};

test('add new task', ()=>{
    const title = 'I am the best';
    const endState = tasksReducer(startState, addNewTaskAC(idTodoList1, title));

    expect(endState[idTodoList1].length).toBe(6);
    expect(endState[idTodoList1][0].title).toBe('I am the best');
});

test('change checkbox status', ()=>{
    const endState = tasksReducer(startState, changeCheckboxStatusAC(idTodoList1, id3, true));

    expect(endState[idTodoList1].length).toBe(5);
    expect(endState[idTodoList1][2].isDone).toBe(true);
});

test('change task title', ()=>{
   const endState = tasksReducer(startState, changeTaskTitleAC(idTodoList2, id1_2, 'i am a new title'));

    expect(endState[idTodoList2][1].title).toBe('i am a new title');
});

test('remove task', ()=>{
    const endState = tasksReducer(startState, removeTaskAC(idTodoList1, id5));

    expect(endState[idTodoList1].length).toBe(4);
    expect(endState[idTodoList2].length).toBe(2);
    expect(endState[idTodoList2].every(t => t.id !== id5)).toBeTruthy();
});

test('new property with new array should be added when new todoList is added', ()=>{
    const endState = tasksReducer(startState, addTodoListAC('New ToDoList'));

    const keys = Object.keys(endState);
    const newKey = keys.find(el => el !== idTodoList1 && el !== idTodoList2);
    if (!newKey) {
        throw new Error('key was not found');
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('task list should be removed with todoList', ()=>{
    const endState = tasksReducer(startState, removeTodoListAC(idTodoList2));

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[idTodoList1]).toBeDefined();
});