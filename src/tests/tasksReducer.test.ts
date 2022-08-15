import {v1} from 'uuid';
import {
    createTask,
    InitialTasksStateType,
    removeTask,
    tasksReducer,
    updateTaskState,
} from '../bll/reducers/tasksReducer';
import {idTodoList1} from './todoListsReduser.test';
import {TaskType} from '../api/tasksAPI';

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
    const endState = tasksReducer(
        startState,
        createTask.fulfilled({task}, 'requestID', {id: id2, value: 'I am the best'})
    );

    expect(endState.tasks.length).toBe(3);
    expect(endState.tasks[0].title).toBe('I am the best');
    expect(endState.tasks[0].entityStatus).toBe('idle');
    expect(endState.tasks[2].entityStatus).toBe('succeeded');
});

test('change checkbox status', ()=>{
    const endState = tasksReducer(
        startState,
        updateTaskState.fulfilled({idTask: id1, model: {
        description: '',
        priority: 1,
        startDate: '',
        status: 0,
        title: 'I am the best',
    }}, 'requestID', {taskId: id1, todoListId: idTodoList1, domainModel: {}}));

    expect(endState.tasks.length).toBe(2);
    expect(endState.tasks[0].status).toBe(0);
});

test('change task title', ()=>{
   const endState = tasksReducer(
       startState,
       updateTaskState.fulfilled({idTask: id1, model: {
       description: '',
       priority: 1,
       startDate: '',
       status: 0,
       title: 'i am a new title',
   }}, 'requestID', {todoListId: idTodoList1, taskId: id1, domainModel: {}}));

    expect(endState.tasks[0].title).toBe('i am a new title');
});

test('change task entity status', ()=>{
   const endState = tasksReducer(
       startState,
       updateTaskState.fulfilled({idTask: id2, model: {
       description: '',
       priority: 1,
       startDate: '',
       status: 0,
       entityStatus: 'loading'
   }}, 'requestID', {taskId: id2, todoListId: idTodoList1, domainModel: {}}));

    expect(endState.tasks[1].entityStatus).toBe('loading');
});

test('remove task', ()=>{
    const endState = tasksReducer(
        startState,
        removeTask.fulfilled({idTask: id2}, 'requestID', {taskId: id2, todoListId: idTodoList1}));

    expect(endState.tasks.length).toBe(1);
    expect(endState.tasks[0].title).toBe('some task title');
});


