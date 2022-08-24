import React from 'react';
import styles from './Preloader.module.css';
import {preloader} from '../../assets';

export const Preloader = React.memo( () => {
    return (
        <div className={styles.container}>
            <img
                className={styles.preloader}
                src={preloader}
                alt="preloader"
            />
        </div>
    );
} );

