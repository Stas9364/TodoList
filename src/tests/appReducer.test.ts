import {appReducer, changeError, initState, mainLoading, secondaryLoading} from "../bll/reducers/appReducer";

test('change todoLists status', ()=>{
    const endState = appReducer(initState, mainLoading({mainLoading:'succeeded'}));

    expect(endState.mainLoading).toBe('succeeded');
});

test('change tasks status', ()=>{
    const endState = appReducer(initState, secondaryLoading({secondaryLoading:'succeeded'}));

    expect(endState.secondaryLoading).toBe('succeeded');
});

test('change error value', ()=>{
    const endState = appReducer(initState, changeError({error:'some error'}));

    expect(endState.error).toBe('some error');
});