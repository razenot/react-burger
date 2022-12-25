import { FC } from 'react';

import styles from './style.module.css';

export const NotFound404: FC = () => {
    return (
        <div className={styles.authenticationPage}>
            <p className='text text_type_main-medium'>Страница не найдена</p>
        </div>
    );
};
