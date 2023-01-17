import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/hooks/redux-hook';
import { costBurger, statusMap, syncIngredientsFormat } from '../../services/utils/helpers';
import { TFeedOrder, TOrderFormat } from '../../services/utils/types';
import globalStyles from './../../global.module.css';
import styles from './feed-detail.module.css';

export const FeedDetail: FC = () => {
    const { id } = useParams<{ id?: string }>();
    const { ingredients } = useSelector((state) => state.ingredientsReducer);
    const { error } = useSelector((state) => state.wsReducer);
    const { orders } = useSelector((state) => state.ordersReducer);

    const order: TFeedOrder | undefined = orders.find((item) => item._id === id);

    const [count, setCount] = useState<{ [id: string]: number }>({});
    const [orderArray, setOrderArray] = useState<Array<TOrderFormat>>([]);

    useEffect(() => {
        if (order?.ingredients) {
            let resultFormat: any = syncIngredientsFormat(order?.ingredients, ingredients);
            setOrderArray(resultFormat.orderArray);
            setCount(resultFormat.count);
        }
    }, [order, ingredients]);

    const [status, setStatus] = useState<{ rus: string; color: string } | undefined>({
        rus: '',
        color: '',
    });

    useEffect(() => {
        setStatus(statusMap(order?.status));
    }, [order?.status]);

    return (
        <>
            {!error ? (
                order && (
                    <div className={styles.feedDetailWrapper}>
                        <div className='text text_type_digits-default'>#{order.number}</div>
                        <div className='text text_type_main-medium mt-5'>{order.name}</div>
                        <div
                            className='text text_type_main-default mt-2'
                            style={{
                                color: status?.color,
                            }}
                        >
                            {status?.rus}
                        </div>
                        <div className='text text_type_main-medium mt-15'>Состав:</div>
                        <div className={`${styles.ingredientsList} custom-scroll mt-6`}>
                            {orderArray &&
                                orderArray.map((ingredient: any, index: number) => {
                                    return (
                                        <div
                                            key={index}
                                            className={`${styles.elementContainer} mb-4`}
                                        >
                                            <div className={`${styles.elementContainer}`}>
                                                <span className={styles.ingredientItemWrap}>
                                                    <img
                                                        src={ingredient.image_mobile}
                                                        alt={ingredient.name}
                                                    />
                                                </span>
                                                <span className='text text_type_main-default ml-4'>
                                                    {ingredient.name}
                                                </span>
                                            </div>
                                            <div
                                                className={`text text_type_digits-default ml-4 ${globalStyles.flexBetweenAndCenter}`}
                                            >
                                                {count[ingredient.id]} x{' '}
                                                {count[ingredient.id] * ingredient.price}
                                                <span className='ml-2 mt-2'>
                                                    <CurrencyIcon type='primary' />
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className={`mt-10 ${globalStyles.flexBetweenAndCenter}`}>
                            <span className='text text_type_main-default text_color_inactive'>
                                <FormattedDate date={new Date(order.createdAt)} />
                            </span>
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
                )
            ) : (
                <p className='text text_type_main-default mt-15'>
                    Произошла ошибка! Обновите страницу.
                </p>
            )}
        </>
    );
};
