import {addTodoList, getTodoLists} from '../reducers/todoListsReducer';
import React, {useEffect} from 'react';
import {Grid, Paper} from '@mui/material';
import AddItemForm from '../common/AddItemForm';
import {Preloader} from '../common/Preloader/Preloader';
import {Todolist} from '../TodoList/Todolist';
import {useAppDispatch, useAppSelector} from "../App/app/hooks";

export const TodoListsList = () => {

    const dispatch = useAppDispatch();

    const isLoading = useAppSelector(state => state.todoListsInitState.isLoading);

    const todoLists =
        useAppSelector(state => state.todoListsInitState.todoLists);

    const addNewTodoList = (newTodoListTitle: string) => {
        dispatch(addTodoList(newTodoListTitle));
    };

    useEffect(() => {
        dispatch(getTodoLists());
    }, []);

    return (
        <>
            <Grid container>
                <AddItemForm addTodoListsElements={addNewTodoList}/>
            </Grid>

            {isLoading
                ? <Preloader/>
                : <Grid container spacing={2}>

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
                                />

                            </Paper>
                        </Grid>;
                    })}
                </Grid>
            }
        </>
    );
};