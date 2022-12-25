import { FC } from 'react';
import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
    Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useRouteMatch } from 'react-router-dom';
import styles from './header.module.css';
import globalStyles from './../../global.module.css';
import { TModalState } from '../../services/utils/types';

const AppHeader: FC = () => {
    const isConstructor: boolean = !!useRouteMatch({ path: '/', exact: true });
    const isFeed: boolean = !!useRouteMatch('/profile/orders');
    const isProfile: boolean = !!useRouteMatch('/profile') && !isFeed;

    return (
        <div className={styles.headerWrapper}>
            <div
                className={`${globalStyles.container} ${globalStyles.blackGrayBG}`}
            >
                <header className={styles.header}>
                    <section className={styles.columnLeft}>
                        <div
                            className={`${styles.link} ${
                                isConstructor ? styles.active : ''
                            }`}
                        >
                            <BurgerIcon
                                type={isConstructor ? 'primary' : 'secondary'}
                            />
                            <Link<TModalState>
                                to='/'
                                className='text text_type_main-default text_color_inactive ml-2'
                            >
                                Конструктор
                            </Link>
                        </div>
                        <div
                            className={`ml-2 ${styles.link} ${
                                isFeed ? styles.active : ''
                            }`}
                        >
                            <ListIcon type={isFeed ? 'primary' : 'secondary'} />
                            <Link<TModalState>
                                to='/profile/orders'
                                className='text text_type_main-default text_color_inactive ml-2'
                            >
                                Лента заказов
                            </Link>
                        </div>
                    </section>
                    <section className={styles.columnCenter}>
                        <Link<TModalState> to='/'>
                            <Logo />
                        </Link>
                    </section>
                    <section className={styles.columnRight}>
                        <div
                            className={`${styles.link} ${
                                isProfile ? styles.active : ''
                            }`}
                        >
                            <ProfileIcon
                                type={isProfile ? 'primary' : 'secondary'}
                            />
                            <Link<TModalState>
                                to='/profile'
                                className='text text_type_main-default text_color_inactive ml-2'
                            >
                                Личный кабинет
                            </Link>
                        </div>
                    </section>
                </header>
            </div>
        </div>
    );
};

export default AppHeader;
