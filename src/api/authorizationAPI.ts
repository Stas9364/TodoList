import axios from 'axios';

type DataType = {
    id: number
    email: string
    login: string
}
export type ResponseType<D = {}> = {
    data: D
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        "API-KEY": "20b2cf04-7cf4-4d25-8e54-5f388ae38747"
    }
});

export const authAPI = {
    authorization () {
        return instance.get<ResponseType<DataType>>('auth/me');
    },
    login (email: string, password: string, rememberMe: boolean) {
        return instance.post<ResponseType<{userId: number}>>('auth/login', {email, password, rememberMe});
    },
    logout () {
        return instance.delete<ResponseType>('auth/login');
    }
};