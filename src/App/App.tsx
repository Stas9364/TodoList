import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {TodoListsList} from '../components/TodoListsList/TodoListsList';
import {CustomizedSnackbars} from '../components/common/Snackbar';
import {useAppSelector} from './app/hooks';


function App() {
    const addStatus = useAppSelector(state => state.app.secondaryLoading);

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

            <div style={{height: '10px'}}>
                {addStatus === 'loading' && <LinearProgress color={"secondary"}/>}
            </div>

            <CustomizedSnackbars/>

            <Container fixed>
                <TodoListsList/>
            </Container>

        </div>
    );
}

export default App;


