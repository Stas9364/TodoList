import {authReducer, getAuthData, initState} from '../features/Auth/authReducer';

//  import {authorization, authReducer, initState} from "../reduxStore/reducers/authReducer";
//
// test('get authorized data', ()=>{
//     const endState = authReducer(initState, authorization({id: 99, email: 'test@test.com', login: 'loginTest', isAuth: true}));
//
//     expect(endState.id).toBe(99);
//     expect(endState.email).toBe('test@test.com');
//     expect(endState.login).toBe('loginTest');
//     expect(endState.isAuth).toBe(true);
// })
//
test('get authorized data', ()=>{
    const endState = authReducer(
        initState,
        getAuthData.fulfilled({id: 99, email: 'test@test.com', login: 'loginTest', isAuth: true}, 'requestID'));

    expect(endState.id).toBe(99);
    expect(endState.email).toBe('test@test.com');
    expect(endState.login).toBe('loginTest');
    expect(endState.isAuth).toBe(true);
});