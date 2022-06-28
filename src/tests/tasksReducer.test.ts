import {v1} from 'uuid';
import {addNewTaskAC, changeCheckboxStatusAC, changeTaskTitleAC, removeTaskAC} from '../actions/tasksActions';
import {InitialTasksStateType, tasksReducer} from "../reducers/tasksReducer";
import {idTodoList1} from "./todoListsReduser.test";

const id1 = v1();
const id2 = v1();


const startState: InitialTasksStateType = {
    tasks: [
        {
            addedDate: '',
            deadline: '',
            description: '',
            id: id1,
            order: 0,
            priority: 1,
            startDate: '',
            status: 1,
            title: 'some task title',
            todoListId: idTodoList1
        },
        {
            addedDate: '',
            deadline: '',
            description: '',
            id: id2,
            order: 0,
            priority: 1,
            startDate: '',
            status: 0,
            title: 'HOHOHO',
            todoListId: idTodoList1
        }
    ]
};

test('add new task', ()=>{
    const task = {
        addedDate: '',
        deadline: '',
        description: '',
        id: id2,
        order: 0,
        priority: 1,
        startDate: '',
        status: 0,
        title: 'I am the best',
        todoListId: idTodoList1
    };
    const endState = tasksReducer(startState, addNewTaskAC(task));

    expect(endState.tasks.length).toBe(3);
    expect(endState.tasks[0].title).toBe('I am the best');
});

test('change checkbox status', ()=>{
    const endState = tasksReducer(startState, changeCheckboxStatusAC(idTodoList1, id1, 0));

    expect(endState.tasks.length).toBe(2);
    expect(endState.tasks[0].status).toBe(0);
});

test('change task title', ()=>{
   const endState = tasksReducer(startState, changeTaskTitleAC(idTodoList1, id1,'i am a new title'));

    expect(endState.tasks[0].title).toBe('i am a new title');
});

test('remove task', ()=>{
    const endState = tasksReducer(startState, removeTaskAC(idTodoList1, id2));

    expect(endState.tasks.length).toBe(1);
    expect(endState.tasks[0].title).toBe('some task title');
});


