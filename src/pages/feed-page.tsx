import { FC, useEffect } from 'react';
import { FeedListInfo } from '../components/feed-list-info/feed-list-info';
import { FeedList } from '../components/feed-list/feed-list';
import { useDispatch, useSelector } from '../services/hooks/redux-hook';
import { wsConnectionClosed } from '../services/redux/actions/creator/ws';
import { getWsOrders } from '../services/redux/actions/ws';
import globalStyles from './../global.module.css';

export const FeedPage: FC = () => {
    const ordersFull = useSelector((state) => state.ordersReducer);
    const error = useSelector((state) => state.wsReducer.error);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWsOrders());
        return () => {
            dispatch(wsConnectionClosed());
        };
    }, [dispatch]);

    return (
        <>
            <h1 className='mt-10 mb-5 text text_type_main-large'>Лента заказов</h1>
            {!error ? (
                <div className={globalStyles.row}>
                    <section className={globalStyles.column6}>
                        <FeedList orders={ordersFull.orders} statusView={false} />
                    </section>
                    <section className={globalStyles.column6}>
                        <FeedListInfo ordersFull={ordersFull} />
                    </section>
                </div>
            ) : (
                <p className='text text_type_main-default'>Произошла ошибка! Обновите страницу.</p>
            )}
        </>
    );
};
