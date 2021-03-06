import React from 'react';
import preloader from '../../../assets/img/preloader.gif'
import styles from './Preloader.module.css'

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

