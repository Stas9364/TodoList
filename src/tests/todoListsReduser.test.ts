import {
    addTodoListAC,
    removeTodoListAC,
    TodoListDomainType,
    todoListsReducer,
    updateTodoListStateAC
} from "../bll/reducers/todoListsReducer";
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
            filter: 'All',
            entityStatus: 'idle'

        },
        {
            id: idTodoList2,
            title: 'Another title',
            addedDate: 'string',
            order: 0,
            filter: 'Completed',
            entityStatus: 'idle'
        }
    ] as Array<TodoListDomainType>,
    isLoading: false
}

test('remove todoList', () => {
    const endState =
        todoListsReducer(initialState, removeTodoListAC({id: idTodoList2}));

    expect(endState.todoLists.length).toBe(1);
    expect(endState.todoLists[0].title).toBe('What to buy');
});

test('add todoList', () => {
    const endState =
        todoListsReducer(initialState, addTodoListAC({todoList: {
            id: idTodoList3,
            title: 'Changed title',
            addedDate: 'string',
            order: 0,
            filter: 'All',
            entityStatus: "idle"
        }}));

    expect(endState.todoLists.length).toBe(3);
    expect(endState.todoLists[0].title).toBe('Changed title');
});

test('change todoList title', () => {
    const endState =
        todoListsReducer(initialState, updateTodoListStateAC({id: idTodoList2, model: {title: 'TEST TEST'}}));

    expect(endState.todoLists[1].title).toBe('TEST TEST');
    expect(endState.todoLists[0].title).toBe('What to buy');
});

test('update todolist value', () => {
    const endState =
        todoListsReducer(initialState, updateTodoListStateAC({id: idTodoList1, model: {filter: 'Active'}}));

    expect(endState.todoLists[1].filter).toBe('Completed');
    expect(endState.todoLists[0].filter).toBe('Active');
});

test('update todolist entityStatus', () => {
    const endState =
        todoListsReducer(initialState, updateTodoListStateAC({id: idTodoList1, model: {entityStatus: 'succeeded'}}));

    expect(endState.todoLists[0].entityStatus).toBe('succeeded');
    expect(endState.todoLists[1].entityStatus).toBe('idle');
});

