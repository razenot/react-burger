import { FC, useEffect } from 'react';
import { FeedList } from '../components/feed-list/feed-list';
import ProfileMenu from '../components/profile-menu/profile-menu';
import { useDispatch, useSelector } from '../services/hooks/redux-hook';
import { wsConnectionClosed } from '../services/redux/actions/creator/ws';
import { getWsUserOrders } from '../services/redux/actions/ws';
import styles from './style.module.css';

export const ProfileOrdersPage: FC = () => {
    const ordersFull = useSelector((state) => state.ordersReducer);
    const error = useSelector((state) => state.wsReducer.error);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWsUserOrders());
        return () => {
            dispatch(wsConnectionClosed());
        };
    }, [dispatch]);

    return (
        <>
            <div className={styles.profileWrapper}>
                <div className={`${styles.leftSidebar} mr-15`}>
                    <ProfileMenu />
                </div>
                <div className={`${styles.profileContent}`}>
                    {!error ? (
                        <FeedList orders={ordersFull.orders} statusView={true} />
                    ) : (
                        <p className='text text_type_main-default'>
                            Произошла ошибка! Обновите страницу.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};
