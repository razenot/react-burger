import { FC, useEffect } from 'react';
import { FeedDetail } from '../components/feed-detail/feed-detail';
import { useDispatch, useSelector } from '../services/hooks/redux-hook';
import { wsConnectionClose } from '../services/redux/actions/creator/ws';
import { getWsOrders } from '../services/redux/actions/ws';
import styles from './style.module.css';

export const FeedDetailPage: FC = () => {
    const { wsConnected } = useSelector((state) => state.wsReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!wsConnected) dispatch(getWsOrders());
    }, [dispatch, wsConnected]);

    useEffect(() => {
        return () => {
            dispatch(wsConnectionClose());
        };
    }, [dispatch]);

    return (
        <div className={styles.orderDetailPage}>
            <FeedDetail />
        </div>
    );
};
