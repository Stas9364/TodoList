import {addTodoList, getTodoLists} from './todoListsReducer';
import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from '@mui/material';
import {Todolist} from './Todolist';
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../App';
import {AddItemForm} from '../../components';
import {authSelectors} from '../Auth';
import {todoListsSelector} from './selectors';

export const TodoListsList = React.memo (() => {

    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(authSelectors.isAuthSelector);
    const todoLists = useAppSelector(todoListsSelector);

    useEffect(() => {
        if (!isAuth) {
            return;
        }
        dispatch(getTodoLists());
    }, []);

    const addNewTodoList = useCallback ((newTodoListTitle: string) => {
        dispatch(addTodoList(newTodoListTitle));
    }, []);

    if (!isAuth) {
        return <Navigate to={'/login'} />;
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