import axios from "axios";

export type TodoListType = {
    id: string
    title: string
    addDate: string
    order: number
}
type ResponseType<D = {}> = {
    data: D
    messages: Array<string>
    resultCode: number
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        "API-KEY": "20b2cf04-7cf4-4d25-8e54-5f388ae38747"
    }
});

export const todoListsAPI = {
    getTodoLists() {
        return instance.get<Array<TodoListType>>(`todo-lists`);
    },
    createTodoList(value: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>(`todo-lists`, {title: value});
    },
    deleteTodoList(todoListID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListID}`);
    },
    updateTodoList(todoListID: string, value: string) {
        return instance.put<ResponseType>(`todo-lists/${todoListID}`, {title: value});
    }
};