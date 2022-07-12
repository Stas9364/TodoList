import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {TodoListsList} from '../components/TodoListsList/TodoListsList';
import {CustomizedSnackbars} from '../components/common/Snackbar';
import {useAppDispatch, useAppSelector} from './app/hooks';
import {LoginForm} from '../components/common/LoginForm';
import {getAuthData, logout} from '../bll/reducers/authReducer';
import {Route, Routes} from 'react-router-dom';
import {Preloader} from "../components/common/Preloader/Preloader";


function App() {
    const dispatch = useAppDispatch();

    const addStatus = useAppSelector(state => state.app.secondaryLoading);
    const initializedApp = useAppSelector(state => state.app.mainLoading);
    const login = useAppSelector(state => state.auth.login);
    const isAuth = useAppSelector(state => state.auth.isAuth);

    const onLogoutHandler = useCallback (() => {
        dispatch(logout());
    }, []);

    useEffect(() => {
        dispatch(getAuthData());
    }, []);

    if (initializedApp === 'loading') {
        return <Preloader/>
    }

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

                    {login ? <span>Welcome {login}</span> : ''}

                    {isAuth
                        ? <Button
                            onClick={onLogoutHandler}
                            color='inherit'
                            variant={'outlined'}
                        >Log out</Button>
                        : <div>{''}</div>}

                </Toolbar>
            </AppBar>

            <div style={{height: '10px'}}>
                {addStatus === 'loading' && <LinearProgress color={"secondary"}/>}
            </div>

            <CustomizedSnackbars/>

            <Container fixed>

                <Routes>
                    <Route path={'/'} element={<TodoListsList/>}/>
                    <Route path={'/login'} element={<LoginForm/>}/>
                </Routes>

            </Container>

        </div>
    );
}

export default App;


