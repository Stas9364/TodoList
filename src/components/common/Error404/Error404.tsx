import React from 'react';
import img from '../../../assets/img/404Page.png'
import styles from './Error404.module.css';

export const Error404 = () => {
    return (
        <div>
            <img src={img} alt="error 404"/>
            <h1 className={styles.text}>Page not found!</h1>
        </div>
    );
};

