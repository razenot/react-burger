import { SyntheticEvent, FC } from 'react';

import { NavLink, useRouteMatch } from 'react-router-dom';
import { useDispatch } from '../../services/hooks/redux-hook';
import { userLogout } from '../../services/redux/actions/auth';
import styles from './profile-menu.module.css';

const ProfileMenu: FC = () => {
    const dispatch = useDispatch();

    const onLogout = (e: SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        dispatch(userLogout());
    };

    const isOrders: boolean = !!useRouteMatch('/profile/orders');
    const isProfile: boolean = !!useRouteMatch('/profile') && !isOrders;

    return (
        <>
            <ul className={styles.menu}>
                <li>
                    <NavLink
                        className={`text text_type_main-medium`}
                        activeClassName={isProfile ? styles.active : ''}
                        to='/profile'
                    >
                        Профиль
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={`text text_type_main-medium`}
                        activeClassName={isOrders ? styles.active : ''}
                        to='/profile/orders'
                    >
                        История заказов
                    </NavLink>
                </li>
                <li>
                    <div className={`text text_type_main-medium`} onClick={onLogout}>
                        Выход
                    </div>
                </li>
            </ul>
            <div className='mt-20'>
                <span
                    className={`text text_type_main-default text_color_inactive ${styles.opacity}`}
                >
                    В этом разделе вы можете изменить свои персональные данные
                </span>
            </div>
        </>
    );
};

export default ProfileMenu;
