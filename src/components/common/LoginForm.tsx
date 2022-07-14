import React from 'react';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from '../../App/app/hooks';
import {login} from '../../bll/reducers/authReducer';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField} from '@mui/material';
import {Navigate} from "react-router-dom";


export const LoginForm = React.memo(() => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state => state.auth.isAuth);

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Required'
                }
            } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                return {
                    email: 'Invalid email address'
                }
            } else if (!values.password) {
                return {
                    password: 'Required'
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(login(values.email, values.password, values.rememberMe));
        }
    });

    if (isAuth) {
        return <Navigate to={'/'} />
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <form onSubmit={formik.handleSubmit}>

                <FormControl>
                    <FormGroup>

                        <TextField
                            label='Email'
                            variant='standard'
                            margin='normal'
                            helperText={formik.errors.email}
                            error={!!formik.errors.email}
                            {...formik.getFieldProps('email')}
                        />

                        <TextField
                            label='Password'
                            variant='standard'
                            type='password'
                            autoComplete='password'
                            margin='normal'
                            helperText={formik.errors.password}
                            error={!!formik.errors.password}
                            {...formik.getFieldProps('password')}
                        />

                        <FormControlLabel
                            label='Remember me'
                            control={
                                <Checkbox
                                    {...formik.getFieldProps('rememberMe')}
                                    checked={formik.values.rememberMe}
                                />
                            }
                        />

                        <Button
                            size={'medium'}
                            color={'primary'}
                            variant={'contained'}
                            type='submit'
                        >Send</Button>

                    </FormGroup>
                </FormControl>

            </form>
        </Grid>
    );
});

