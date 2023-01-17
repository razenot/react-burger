import { FC, useEffect } from 'react';
import { FeedDetail } from '../components/feed-detail/feed-detail';
import { useDispatch } from '../services/hooks/redux-hook';
import { wsConnectionClosed } from '../services/redux/actions/creator/ws';
import { getWsUserOrders } from '../services/redux/actions/ws';
import styles from './style.module.css';

export const ProfileOrdersDetailPage: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWsUserOrders());
        return () => {
            dispatch(wsConnectionClosed());
        };
    }, [dispatch]);

    return (
        <div className={styles.orderDetailPage}>
            <FeedDetail />
        </div>
    );
};
