import {
    addTodoListAC,
    changeTodoListFilterValueAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from '../actions/todoListsActions';
import {InitialStateType, todoListsReducer} from "../reducers/todoListsReducer";
import {v1} from "uuid";

export const idTodoList1 = v1();
export const idTodoList2 = v1();
export const idTodoList3 = v1();

export const initialState: InitialStateType = {
    todoLists: [
        {
            id: idTodoList1,
            title: 'What to buy',
            addedDate: 'string',
            order: 0,
            filter: 'All'
        },
        {
            id: idTodoList2,
            title: 'Another title',
            addedDate: 'string',
            order: 0,
            filter: 'Completed'
        }
    ]
}

test('remove todoList', () => {
    const endState =
        todoListsReducer(initialState, removeTodoListAC(idTodoList2));

    expect(endState.todoLists.length).toBe(1);
    expect(endState.todoLists[0].title).toBe('What to buy');
});

test('add todoList', () => {
    const newTodoListTitle = 'New ToDoList1';

    const endState =
        todoListsReducer(initialState, addTodoListAC(newTodoListTitle, idTodoList3, '', 0));

    expect(endState.todoLists.length).toBe(3);
    expect(endState.todoLists[0].title).toBe('New ToDoList1');
    expect(endState.todoLists[0].filter).toBe('All');
});

test('change todoList title', () => {
    const newTodoListTitle = 'New ToDoList2';

    const endState =
        todoListsReducer(initialState, changeTodoListTitleAC(idTodoList1, newTodoListTitle));

    expect(endState.todoLists[1].title).toBe('Another title');
    expect(endState.todoLists[0].title).toBe('New ToDoList2');
});

test('change filter value', () => {
    const filterValue = 'Active';

    const endState =
        todoListsReducer(initialState, changeTodoListFilterValueAC(idTodoList1, filterValue));

    expect(endState.todoLists[1].filter).toBe('Completed');
    expect(endState.todoLists[0].filter).toBe('Active');
});