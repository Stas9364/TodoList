import {authorization, authReducer, initState} from "../bll/reducers/authReducer";

test('get authorized data', ()=>{
    const endState = authReducer(initState, authorization({id: 99, email: 'test@test.com', login: 'loginTest', isAuth: true}));

    expect(endState.id).toBe(99);
    expect(endState.email).toBe('test@test.com');
    expect(endState.login).toBe('loginTest');
    expect(endState.isAuth).toBe(true);
})