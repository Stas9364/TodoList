import {addTodoList, getTodoLists} from '../../bll/reducers/todoListsReducer';
import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from '@mui/material';
import AddItemForm from '../common/AddItemForm';
import {Todolist} from '../TodoList/Todolist';
import {useAppDispatch, useAppSelector} from '../../App/app/hooks';
import {Navigate} from 'react-router-dom';

export const TodoListsList = React.memo (() => {

    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state => state.auth.isAuth);

    useEffect(() => {
        if (!isAuth) {
            return;
        }
        dispatch(getTodoLists());
    }, []);


    const todoLists = useAppSelector(state => state.todoListsInitState.todoLists);

    const addNewTodoList = useCallback ((newTodoListTitle: string) => {
        dispatch(addTodoList(newTodoListTitle));
    }, []);


    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid container>
                <AddItemForm addTodoListsElements={addNewTodoList}/>
            </Grid>

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