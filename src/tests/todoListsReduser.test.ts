import {
    addTodoListAC,
    changeTodoListFilterValueAC,
    changeTodoListTitleAC, isLoadingAC,
    removeTodoListAC
} from '../actions/todoListsActions';
import {TodoListDomainType, todoListsReducer} from "../reducers/todoListsReducer";
import {v1} from "uuid";

export const idTodoList1 = v1();
export const idTodoList2 = v1();
export const idTodoList3 = v1();

export const initialState = {
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
    ] as Array<TodoListDomainType>,
    isLoading: false
}

test('remove todoList', () => {
    const endState =
        todoListsReducer(initialState, removeTodoListAC(idTodoList2));

    expect(endState.todoLists.length).toBe(1);
    expect(endState.todoLists[0].title).toBe('What to buy');
});

test('add todoList', () => {
    const endState =
        todoListsReducer(initialState, addTodoListAC({
            id: idTodoList3,
            title: 'Changed title',
            addedDate: 'string',
            order: 0,
            filter: 'All'
        }));

    expect(endState.todoLists.length).toBe(3);
    expect(endState.todoLists[0].title).toBe('Changed title');
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

test('is loading changed', ()=>{
    const endState =
        todoListsReducer(initialState, isLoadingAC(true));

    expect(endState.isLoading).toBeTruthy();
})