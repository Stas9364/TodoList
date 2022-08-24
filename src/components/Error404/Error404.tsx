import React from 'react';
import styles from './Error404.module.css';
import {ErrorPage} from '../../assets';

export const Error404 = () => {
    return (
        <div>
            <img src={ErrorPage} alt="error 404"/>
            <h1 className={styles.text}>Page not found!</h1>
        </div>
    );
};

