import React, {useCallback} from 'react';
import './App.css';
import {FilterValueType, TaskType, Todolist} from './TodoList/Todolist';
import AddItemForm from './TodoList/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addTodoListAC,
} from './actions/todoListsActions';
import {AppStateType} from './State/storeTodoList';
import {useDispatch, useSelector} from 'react-redux';

export type TodoListsType = {
    id: string
    filter: FilterValueType
    title: string
}
export type TasksStateType = {
    [idTodoList: string]: TaskType[]
}


function App() {

    const dispatch = useDispatch();
    const todoLists = useSelector<AppStateType>(state => state.todoLists) as Array<TodoListsType>;

    const addNewTodoList = useCallback((newTodoListTitle: string) => {
        dispatch(addTodoListAC(newTodoListTitle));
    }, [dispatch]);

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
