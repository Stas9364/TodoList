import {TasksStateType, TodoListsType} from '../App';
import {tasksReducer} from '../State/tasksReducer';
import {todoListsReducer} from '../State/todoListsReducer';
import {addTodoListAC} from '../actions/todoListsActions';

test('ids should be equal', ()=>{
    const startStateTasks: TasksStateType = {};
    const startStateTodoLists: Array<TodoListsType> = [];

    const action = addTodoListAC('New TodoList');

    const endStateTasks = tasksReducer(startStateTasks, action);
    const endStateTodoLists = todoListsReducer(startStateTodoLists, action);

    const keys = Object.keys(endStateTasks);
    const idFromTasks = keys[0];
    const idFromTodoList = endStateTodoLists[0].id;

    expect(idFromTasks).toBe(action.todoListId);
    expect(idFromTodoList).toBe(action.todoListId);
});