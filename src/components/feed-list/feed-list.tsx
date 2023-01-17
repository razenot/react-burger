import { FC } from 'react';
import { TFeedOrder, TIngredient, TModalState } from '../../services/utils/types';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/hooks/redux-hook';
import { Link, useLocation } from 'react-router-dom';
import { costBurger, statusMap } from '../../services/utils/helpers';
import globalStyles from './../../global.module.css';
import styles from './feed-list.module.css';

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
                    let status = statusMap(order.status);
                    return (
                        <div className={`${styles.item} mb-4`} key={order._id}>
                            <div
                                className={`${globalStyles.row} ${globalStyles.justifyContentBetween}`}
                            >
                                <span className='text text_type_digits-default'>
                                    #{order.number}
                                </span>
                                <span className='text text_type_main-default text_color_inactive'>
                                    <FormattedDate date={new Date(order.createdAt)} />
                                </span>
                            </div>
                            <div className='text text_type_main-medium mt-6'>
                                <Link
                                    to={{
                                        pathname: `${location.pathname}/${order._id}`,
                                        state: { background: location },
                                    }}
                                >
                                    {order.name}
                                </Link>
                            </div>
                            {statusView && status && (
                                <div
                                    className='text text_type_main-default mt-2'
                                    style={{ color: status.color }}
                                >
                                    {status.rus}
                                </div>
                            )}
                            <div className={`${globalStyles.flexBetweenAndCenter} mt-6`}>
                                <div className={styles.ingredientList}>
                                    {order.ingredients.map((ingredientId, index) => {
                                        if (index > 5) return null;
                                        let itemDetail: TIngredient | undefined = ingredients.find(
                                            (item) => item._id === ingredientId
                                        );
                                        return (
                                            <span key={index} className={styles.ingredientItemWrap}>
                                                <img
                                                    src={itemDetail?.image_mobile}
                                                    alt={itemDetail?.name}
                                                />
                                            </span>
                                        );
                                    })}
                                    {order.ingredients.length > 6 && (
                                        <span className={styles.ingredientItemMore}>
                                            <span className='text text_type_main-small'>
                                                +{order.ingredients.length - 6}
                                            </span>
                                        </span>
                                    )}
                                </div>
                                <span
                                    className={`text text_type_digits-default ${globalStyles.flexBetweenAndCenter}`}
                                >
                                    {costBurger(order.ingredients, ingredients)}
                                    <span className='ml-2 mt-2'>
                                        <CurrencyIcon type='primary' />
                                    </span>
                                </span>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};
