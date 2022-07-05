import {appReducer, initState} from "../bll/reducers/appReducer";
import {changeErrorAC, secondaryLoadingAC, mainLoadingAC} from "../bll/actions/appActions";

test('change todoLists status', ()=>{
    const endState = appReducer(initState, mainLoadingAC('succeeded'));

    expect(endState.mainLoading).toBe('succeeded');
});

test('change tasks status', ()=>{
    const endState = appReducer(initState, secondaryLoadingAC('succeeded'));

    expect(endState.secondaryLoading).toBe('succeeded');
});

test('change error value', ()=>{
    const endState = appReducer(initState, changeErrorAC('some error'));

    expect(endState.error).toBe('some error');
});