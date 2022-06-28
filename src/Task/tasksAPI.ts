import axios from "axios";

export enum TasksStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: number
    startDate: string
    status: TasksStatuses
    title: string
    todoListId: string
}
type TasksType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}
type ResponseType<D = {}> = {
    data: D
    resultCode: number
    massages: Array<string>
    fieldsErrors: Array<string>
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        "API-KEY": "20b2cf04-7cf4-4d25-8e54-5f388ae38747"
    }
});

export const tasksAPI = {
    getTasks(todoListID: string) {
        return instance.get<TasksType>(`todo-lists/${todoListID}/tasks`);
    },
    createTask(todoListID: string, value: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(
            `todo-lists/${todoListID}/tasks`, {title: value}
        );
    },
    deleteTask(todoListID: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`);
    },
    updateTask(todoListID: string, taskID: string, value: string, statusVal: number) {
        return instance.put<ResponseType<{ item: TaskType }>>(
            `todo-lists/${todoListID}/tasks/${taskID}`,
            {
                title: value,
                status: statusVal
            }
        );
    }
};

