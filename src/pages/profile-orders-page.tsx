import { FC, useEffect } from 'react';
import { FeedList } from '../components/feed-list/feed-list';
import ProfileMenu from '../components/profile-menu/profile-menu';
import { useDispatch, useSelector } from '../services/hooks/redux-hook';
import { clearOrders } from '../services/redux/actions/creator/orders';
import { wsConnectionClose } from '../services/redux/actions/creator/ws';
import { getWsUserOrders } from '../services/redux/actions/ws';
import styles from './style.module.css';

export const ProfileOrdersPage: FC = () => {
    const ordersFull = useSelector((state) => state.feedReducer);
    const { error, wsConnected } = useSelector((state) => state.wsReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!wsConnected) dispatch(getWsUserOrders());
    }, [dispatch, wsConnected]);

    useEffect(() => {
        return () => {
            dispatch(clearOrders());
            dispatch(wsConnectionClose());
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
