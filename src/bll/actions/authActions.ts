export const enum AUTH_ACTION_TYPE {
    AUTHORIZATION = 'AUTHORIZATION'
}
export type AuthActionsType = ReturnType<typeof authorization>;

export const authorization = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: AUTH_ACTION_TYPE.AUTHORIZATION,
    authData: {id, email, login, isAuth}
} as const);

