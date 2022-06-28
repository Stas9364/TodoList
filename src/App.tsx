import React, {useEffect} from 'react';
import './App.css';
import {Todolist} from './TodoList/Todolist';
import AddItemForm from './common/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {AppStateType} from './storeRedux/storeTodoList';
import {useDispatch, useSelector} from 'react-redux';
import {TodoListType} from "./TodoList/todoListsAPI";
import {addTodoList, getTodoLists} from "./reducers/todoListsReducer";
import {Dispatch} from "redux";


function App() {

    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        dispatch(getTodoLists());
    }, []);

    const todoLists =
        useSelector<AppStateType>(state => {
            return state.todoListsInitState.todoLists
        }) as Array<TodoListType>;

    const addNewTodoList = (newTodoListTitle: string) => {
        dispatch(addTodoList(newTodoListTitle));
    };

    return (
        <div className="App">
            <AppBar position="static" color={'primary'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div">
                        TODO LIST
                    </Typography>
                    <Button
                        color='inherit'
                        variant={'outlined'}
                    >Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
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
                                />
                            </Paper>
                        </Grid>;
                    })}
                </Grid>

            </Container>
        </div>
    );
}

export default App;
