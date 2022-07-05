import {addTodoList, getTodoLists} from '../../bll/reducers/todoListsReducer';
import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from '@mui/material';
import AddItemForm from '../common/AddItemForm';
import {Preloader} from '../common/Preloader/Preloader';
import {Todolist} from '../TodoList/Todolist';
import {useAppDispatch, useAppSelector} from '../../App/app/hooks';

export const TodoListsList = React.memo (() => {

    const dispatch = useAppDispatch();

    const todoListsStatus = useAppSelector(state => state.app.mainLoading);

    const todoLists =
        useAppSelector(state => state.todoListsInitState.todoLists);

    const addNewTodoList = useCallback ((newTodoListTitle: string) => {
        dispatch(addTodoList(newTodoListTitle));
    }, []);

    useEffect(() => {
        dispatch(getTodoLists());
    }, []);

    return (
        <>
            <Grid container>
                <AddItemForm addTodoListsElements={addNewTodoList}/>
            </Grid>

            {todoListsStatus === 'loading' && <Preloader/>}
                 <Grid container spacing={2}>

                    {todoLists.map(tl => {

                        return <Grid item key={tl.id}>
                            <Paper
                                elevation={4}
                                style={{padding: '0 10px 10px 10px'}}
                            >
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    filter={tl.filter}
                                    entityStatus={tl.entityStatus}
                                />
                            </Paper>
                        </Grid>;
                    })}
                </Grid>
            {/*}*/}
        </>
    );
} );