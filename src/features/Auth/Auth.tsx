import React from 'react';
import {FormikHelpers, useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from '../../App';
import {login} from './authReducer';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material';
import {Navigate} from 'react-router-dom';
import {isAuthSelector} from './selectors';

type FormikErrorsType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Auth = React.memo(() => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(isAuthSelector);

    const formik = useFormik({
        validate: (values) => {
            const errors = {} as FormikErrorsType;
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 2) {
                errors.password = 'Password should be more then 2 symbols';
            }
            return errors;
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: async (values: FormikErrorsType, formikHelpers: FormikHelpers<FormikErrorsType>) => {
            const action = await dispatch(login({
                email: values.email, password: values.password, rememberMe: values.rememberMe
            }));
            if (login.rejected.match(action)) {
                if (action.payload) {
                    formikHelpers.setFieldError('email', action.payload.errors[0]);
                }
            }
        }
    });

    if (isAuth) {
        return <Navigate to={'/'}/>;
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <form onSubmit={formik.handleSubmit}>

                <FormControl style={{width: '300px'}}>
                    <FormLabel>
                        To log in use: <br/>
                        Email: free@samuraijs.com <br/>
                        Password: free
                    </FormLabel>
                    <FormGroup>

                        <TextField
                            label='Email'
                            variant='standard'
                            margin='normal'
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email
                            && <div style={{color: 'red'}}>{formik.errors.email}</div>
                        }

                        <TextField
                            label='Password'
                            variant='standard'
                            type='password'
                            autoComplete='password'
                            margin='normal'
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password
                            && <div style={{color: 'red'}}>{formik.errors.password}</div>
                        }


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

