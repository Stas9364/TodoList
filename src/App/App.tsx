import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {TodoListsList} from '../TodoListsList/TodoListsList';


function App() {
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
                <TodoListsList/>
            </Container>

        </div>
    );
}

export default App;


