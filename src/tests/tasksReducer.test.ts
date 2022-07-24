import {v1} from 'uuid';
import {
    addNewTaskAC,
    InitialTasksStateType,
    removeTaskAC,
    tasksReducer,
    updateTaskStateAC
} from "../bll/reducers/tasksReducer";
import {idTodoList1} from "./todoListsReduser.test";
import {TaskType} from "../api/tasksAPI";

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
            todoListId: idTodoList1,
            entityStatus: 'idle'
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
            todoListId: idTodoList1,
            entityStatus: 'succeeded'
        }
    ]
};

test('add new task', ()=>{
    const task: TaskType = {
        addedDate: '',
        deadline: '',
        description: '',
        id: id2,
        order: 0,
        priority: 1,
        startDate: '',
        status: 0,
        title: 'I am the best',
        todoListId: idTodoList1,
        entityStatus: 'idle'
    };
    const endState = tasksReducer(startState, addNewTaskAC({task}));

    expect(endState.tasks.length).toBe(3);
    expect(endState.tasks[0].title).toBe('I am the best');
    expect(endState.tasks[0].entityStatus).toBe('idle');
    expect(endState.tasks[2].entityStatus).toBe('succeeded');
});

test('change checkbox status', ()=>{
    const endState = tasksReducer(startState, updateTaskStateAC({idTask: id1, model: {
        description: '',
        priority: 1,
        startDate: '',
        status: 0,
        title: 'I am the best',
    }}));

    expect(endState.tasks.length).toBe(2);
    expect(endState.tasks[0].status).toBe(0);
});

test('change task title', ()=>{
   const endState = tasksReducer(startState, updateTaskStateAC({idTask: id1, model: {
       description: '',
       priority: 1,
       startDate: '',
       status: 0,
       title: 'i am a new title',
   }}));

    expect(endState.tasks[0].title).toBe('i am a new title');
});

test('change task entity status', ()=>{
   const endState = tasksReducer(startState, updateTaskStateAC({idTask: id2, model: {
       description: '',
       priority: 1,
       startDate: '',
       status: 0,
       entityStatus: 'loading'
   }}));

    expect(endState.tasks[1].entityStatus).toBe('loading');
});

test('remove task', ()=>{
    const endState = tasksReducer(startState, removeTaskAC({idTask: id2}));

    expect(endState.tasks.length).toBe(1);
    expect(endState.tasks[0].title).toBe('some task title');
});


