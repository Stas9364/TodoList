import React from 'react';
import './App.css';
import {FilterValueType, TaskType, Todolist} from './TodoList/Todolist';
import AddItemForm from './TodoList/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from './State/todoListRedux';
import {addNewTaskAC, changeCheckboxStatusAC, changeTaskTitleAC, removeTaskAC} from './State/tasks/tasksActions';
import {
    addTodoListAC,
    changeTodoListFilterValueAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from './State/todoLists/todoListsActions';

export type TodoListsType = {
    id: string
    filter: FilterValueType
    title: string
}
export type TasksStateType = {
    [idTodoList: string]: TaskType[]
}

function App() {

    const todoLists = useSelector<AppStateType>(state => state.todoLists)as Array<TodoListsType>;
    const tasksObj = useSelector<AppStateType>(state => state.tasks)as TasksStateType;
    const dispatch = useDispatch();


    const addNewTodoList = ((newTodoListTitle: string) => {
        dispatch(addTodoListAC(newTodoListTitle));
    });

    const changeTodoListTitle = (todoListId: string, title: string, ) => {
        dispatch(changeTodoListTitleAC(todoListId, title));
    };

    const changeFilter = (todoListId: string, filter: FilterValueType) => {
        dispatch(changeTodoListFilterValueAC(todoListId, filter));
    };

    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodoListAC(todoListId));
    };



    const addNewTask = (todoListId: string, title: string, ) => {
        dispatch(addNewTaskAC(todoListId, title));
    };

    const checkboxChange = (todoListId: string, idTask: string, isDone: boolean) => {
        dispatch(changeCheckboxStatusAC(todoListId, idTask, isDone));
    };

    const changeTasksTitle = (todoListId: string, idTask: string, title: string, ) => {
        dispatch(changeTaskTitleAC(todoListId, idTask, title));
    };

    const removeTask = (todoListId: string, idTask: string) => {
        dispatch(removeTaskAC(todoListId, idTask));
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
                    <Typography variant="h6" component="div" >
                        TODO LIST
                    </Typography>
                    <Button
                        color='inherit'
                        variant={'outlined'}
                    >Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container >
                    <AddItemForm addTodoListsElements={addNewTodoList}/>
                </Grid>

                <Grid container spacing={2}>
                    {todoLists.map(tl => {

                        let allTasks = tasksObj[tl.id];//default value
                        if (tl.filter === 'Completed') allTasks = allTasks.filter(el => el.isDone); //choose active tab
                        if (tl.filter === 'Active') allTasks = allTasks.filter(el => !el.isDone); //choose completed tab

                        return <Grid item key={tl.id}>
                            <Paper
                                elevation={4}
                                style={{padding: '0 10px 10px 10px'}}
                            >
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={allTasks}
                                    filter={tl.filter}

                                    removeTask={removeTask}
                                    addNewTask={addNewTask}
                                    checkboxChange={checkboxChange}
                                    changeTasksTitle={changeTasksTitle}

                                    changeTodoListTitle={changeTodoListTitle}
                                    changeFilter={changeFilter}
                                    removeTodoList={removeTodoList}
                                    addTodoListsElement={addNewTodoList}
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
