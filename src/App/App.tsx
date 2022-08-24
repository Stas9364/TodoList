import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {TodoListsList} from '../features/TodoList/TodoListsList';
import {Auth} from '../features/Auth';
import {getAuthData, logout} from '../features/Auth/authReducer';
import {Navigate, Route, Routes} from 'react-router-dom';
import {authSelectors} from '../features/Auth';
import {mainLoadingSelector, secondaryLoadingSelector} from './selectors';
import {useAppDispatch, useAppSelector} from './app/hooks';
import {CustomizedSnackbars, Error404, Preloader} from '../components';


function App() {
    const dispatch = useAppDispatch();

    const addStatus = useAppSelector(secondaryLoadingSelector);
    const initializedApp = useAppSelector(mainLoadingSelector);
    const login = useAppSelector(authSelectors.loginSelector);
    const isAuth = useAppSelector(authSelectors.isAuthSelector);

    const onLogoutHandler = useCallback (() => {
        dispatch(logout());
    }, []);

    useEffect(() => {
        dispatch(getAuthData());
    }, []);

    if (initializedApp === 'loading') {
        return <Preloader/>;
    }

    return (
        <div className='App'>

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
                {addStatus === 'loading' && <LinearProgress color={'secondary'}/>}
            </div>

            <CustomizedSnackbars/>

            <Container fixed>

                <Routes>
                    <Route path={'/'} element={<TodoListsList/>}/>
                    <Route path={'/login'} element={<Auth/>}/>

                    <Route path={'/404'} element={<Error404/>}/>
                    <Route path={'*'} element={<Navigate to={'/404'} />} />
                </Routes>

            </Container>

        </div>
    );
}

export default App;


