import { FC } from 'react';
import { TOrdersState } from '../../services/redux/reducers/orders';
import globalStyles from './../../global.module.css';
import styles from './feed-list-info.module.css';

export const FeedListInfo: FC<{ ordersFull: TOrdersState }> = ({ ordersFull }) => {
    return (
        <div className={`${globalStyles.wrapper} pl-10`}>
            {ordersFull.orders.length !== 0 && (
                <>
                    <div className={globalStyles.row}>
                        <div className={globalStyles.column6}>
                            <div>
                                <div className='text text_type_main-medium mb-6'>Готовы:</div>
                                <ul className={styles.numberList}>
                                    {ordersFull.orders.length > 0 &&
                                        ordersFull.orders.map(
                                            (order, index) =>
                                                order.status === 'done' && (
                                                    <li
                                                        key={index}
                                                        className={`text text_type_digits-default ${styles.done}`}
                                                    >
                                                        {order.number}
                                                    </li>
                                                )
                                        )}
                                </ul>
                            </div>
                        </div>
                        <div className={globalStyles.column6}>
                            <div>
                                <div className='text text_type_main-medium mb-6'>В работе:</div>
                                <ul className={styles.numberList}>
                                    {ordersFull.orders.length > 0 &&
                                        ordersFull.orders.map(
                                            (order, index) =>
                                                order.status === 'pending' && (
                                                    <li
                                                        key={index}
                                                        className={`text text_type_digits-default`}
                                                    >
                                                        {order.number}
                                                    </li>
                                                )
                                        )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='text text_type_main-medium mt-15'>Выполнено за все время:</div>
                    <div className={`${styles.magicShadow} text text_type_digits-large`}>
                        {ordersFull.total}
                    </div>
                    <div className='text text_type_main-medium mt-15'>Выполнено за сегодня:</div>
                    <div className={`${styles.magicShadow} text text_type_digits-large`}>
                        {ordersFull.todayTotal}
                    </div>
                </>
            )}
        </div>
    );
};
