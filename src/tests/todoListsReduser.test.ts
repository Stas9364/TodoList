import {idTodoList1, idTodoList2, todoListsReducer} from '../State/todoListsReducer';
import {
    addTodoListAC,
    changeTodoListFilterValueAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from '../actions/todoListsActions';
import {initialState} from '../State/todoListsReducer';


test('remove todoList', () => {
    const endState =
        todoListsReducer(initialState, removeTodoListAC(idTodoList1));

    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe('What to buy');
});

test('add todoList', () => {
    const newTodoListTitle = 'New ToDoList';

    const endState =
        todoListsReducer(initialState, addTodoListAC(newTodoListTitle));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('New ToDoList');
    expect(endState[0].filter).toBe('All');
});

test('change todoList title', () => {
    const newTodoListTitle = 'New ToDoList';

    const endState =
        todoListsReducer(initialState, changeTodoListTitleAC(idTodoList2, newTodoListTitle));

    expect(endState[1].title).toBe('New ToDoList');
    expect(endState[0].title).toBe('What to do');
});

test('change filter value', () => {
    const filterValue = 'Completed';

    const endState =
        todoListsReducer(initialState, changeTodoListFilterValueAC(idTodoList2, filterValue));

    expect(endState[1].filter).toBe('Completed');
    expect(endState[0].filter).toBe('Active');
});