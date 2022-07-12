import {authReducer, initState} from "../bll/reducers/authReducer";
import {authorization} from "../bll/actions/authActions";

test('get authorized data', ()=>{
    const endState = authReducer(initState, authorization(99, 'test@test.com', 'loginTest', true));

    expect(endState.id).toBe(99);
    expect(endState.email).toBe('test@test.com');
    expect(endState.login).toBe('loginTest');
    expect(endState.isAuth).toBe(true);
})