import { FC } from 'react';
import { TFeedOrder, TModalState } from '../../services/utils/types';
import { useSelector } from '../../services/hooks/redux-hook';
import { Link, useLocation } from 'react-router-dom';
import styles from './feed-list.module.css';
import { FeedListItem } from '../feed-list-item/feed-list-item';

export const FeedList: FC<{ orders: Array<TFeedOrder>; statusView: boolean }> = ({
    orders,
    statusView,
}) => {
    const location = useLocation<TModalState>();

    const { ingredients } = useSelector((state) => state.ingredientsReducer);

    return (
        <div className={`${styles.list} custom-scroll`}>
            {orders.length !== 0 &&
                orders.map((order: TFeedOrder) => {
                    return (
                        <Link
                            key={order._id}
                            to={{
                                pathname: `${location.pathname}/${order._id}`,
                                state: { background: location },
                            }}
                        >
                            <FeedListItem
                                order={order}
                                ingredients={ingredients}
                                statusView={statusView}
                            />
                        </Link>
                    );
                })}
        </div>
    );
};
