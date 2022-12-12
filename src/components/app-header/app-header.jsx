import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
    Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useRouteMatch } from 'react-router-dom';
import styles from './header.module.css';
import globalStyles from './../../global.module.css';

function AppHeader() {
    const isConstructor = !!useRouteMatch({ path: '/', exact: true });
    const isFeed = !!useRouteMatch('/profile/orders');
    const isProfile = !!useRouteMatch('/profile') && !isFeed;

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
                            <Link
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
                            <Link
                                to='/profile/orders'
                                className='text text_type_main-default text_color_inactive ml-2'
                            >
                                Лента заказов
                            </Link>
                        </div>
                    </section>
                    <section className={styles.columnCenter}>
                        <Logo />
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
                            <Link
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
}

export default AppHeader;
