import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { costBurger, statusMap } from '../../services/utils/helpers';
import { TFeedOrder, TIngredient } from '../../services/utils/types';
import globalStyles from './../../global.module.css';
import styles from './feed-list-item.module.css';

export const FeedListItem: FC<{
    order: TFeedOrder;
    ingredients: ReadonlyArray<TIngredient>;
    statusView: boolean;
}> = ({ order, ingredients, statusView }) => {
    const status = statusMap(order.status);
    return (
        <div className={`${styles.item} mb-4`}>
            <div className={`${globalStyles.row} ${globalStyles.justifyContentBetween}`}>
                <span className='text text_type_digits-default'>#{order.number}</span>
                <span className='text text_type_main-default text_color_inactive'>
                    <FormattedDate date={new Date(order.createdAt)} />
                </span>
            </div>
            <div className='text text_type_main-medium mt-6'>{order.name}</div>
            {statusView && status && (
                <div className='text text_type_main-default mt-2' style={{ color: status.color }}>
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
                                <img src={itemDetail?.image_mobile} alt={itemDetail?.name} />
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
};
