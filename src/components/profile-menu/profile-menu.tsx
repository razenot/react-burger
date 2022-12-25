import { useDispatch } from 'react-redux';
import { SyntheticEvent, FC } from 'react';

import { NavLink } from 'react-router-dom';
import { userLogout } from '../../services/redux/auth/action';
import styles from './profile-menu.module.css';

const ProfileMenu: FC = () => {
    const dispatch = useDispatch<any>();

    const onLogout = (e: SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        dispatch(userLogout());
    };

    return (
        <>
            <ul className={styles.menu}>
                <li>
                    <NavLink
                        className={`text text_type_main-medium`}
                        activeClassName={styles.active}
                        to='/profile'
                    >
                        Профиль
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={`text text_type_main-medium`}
                        activeClassName={styles.active}
                        to='/profile/orders'
                    >
                        История заказов
                    </NavLink>
                </li>
                <li>
                    <div
                        className={`text text_type_main-medium`}
                        onClick={onLogout}
                    >
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
