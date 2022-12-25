import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import {
    ConstructorElement,
    Button,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient';
import {
    CONSTRUCTOR_RESET,
    constructorAdd,
} from '../../services/redux/constructor/action';
import { sendOrder, ORDER_RESET } from '../../services/redux/order/action';
import { TIngredient, TModalState } from '../../services/utils/types';
import { Loader } from '../../ui/loader/loader';
import styles from './burger-constructor.module.css';

const BurgerConstructor: FC = () => {
    const [total, setTotal] = useState<number>(0);

    const [visibleOrderDetail, setVisibleOrderDetail] =
        useState<boolean>(false);

    // @ts-ignore: Unreachable code error
    const { isAuth } = useSelector((state) => state.authReducer);

    const { orderFields, loading, error } = useSelector(
        // @ts-ignore: Unreachable code error
        (state) => state.orderReducer
    );

    const { ingredients, bun } = useSelector(
        // @ts-ignore: Unreachable code error
        (state) => state.constructorReducer
    );

    const dispatch = useDispatch<any>();

    const history = useHistory<TModalState>();

    useEffect(() => {
        let price: number = ingredients.length
            ? ingredients.reduce((a: number, b: TIngredient) => a + b.price, 0)
            : 0;
        price += bun ? bun.price * 2 : 0;
        setTotal(price);
    }, [ingredients, bun]);

    useEffect(() => {
        if (error?.message) alert(error.message);
    }, [error]);

    const handleCloseOrderDetail = () => {
        dispatch({
            type: ORDER_RESET,
        });
        dispatch({
            type: CONSTRUCTOR_RESET,
        });
        if (ingredients.length) setVisibleOrderDetail(false);
    };

    const handleCreateOrder = () => {
        if (localStorage.getItem('accessToken') && isAuth) {
            let toOrder: string[] = [];
            toOrder = [
                bun._id,
                ...ingredients.map((ingredient: TIngredient) => ingredient._id),
                bun._id,
            ];
            dispatch(sendOrder(toOrder));
            setVisibleOrderDetail(true);
        } else {
            history.replace({ pathname: '/login' });
        }
    };

    const [, dropBunTarget] = useDrop({
        accept: 'bun',
        drop(item: TIngredient) {
            moveIngredients(item);
        },
    });

    const [, dropIngredientTarget] = useDrop({
        accept: 'ingredient',
        drop(item: TIngredient) {
            moveIngredients(item);
        },
    });

    const moveIngredients = (ingredient: TIngredient) => {
        dispatch(constructorAdd(ingredient));
    };

    return (
        <div className={`${styles.burgerConstructor} ml-5 mt-5`}>
            {error ? (
                <div className='mt-10 text text_type_main-medium'>
                    Произошла ошибка, перезагрузите страницу.
                </div>
            ) : (
                <>
                    <div className={styles.elementsWrapper}>
                        <div className='pl-4 pr-4'>
                            <div
                                className={`${styles.elementContainer}`}
                                ref={dropBunTarget}
                            >
                                <div className={styles.ingredient}>
                                    {!bun ? (
                                        <div
                                            className={`${styles.emptyIngredient} ${styles.emptyIngredientTop}`}
                                        >
                                            Добавьте булку
                                        </div>
                                    ) : (
                                        <ConstructorElement
                                            type='top'
                                            isLocked={true}
                                            text={`${bun.name} (верх)`}
                                            price={bun.price}
                                            thumbnail={bun.image}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div
                            className={`${styles.scrollable} custom-scroll pl-4 pr-4`}
                            ref={dropIngredientTarget}
                        >
                            {!ingredients.length ? (
                                <div className={styles.elementContainer}>
                                    <div className={styles.ingredient}>
                                        <div className={styles.emptyIngredient}>
                                            Добавьте ингредиенты
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ingredients.map(
                                    (item: TIngredient, index: number) => (
                                        <ConstructorIngredient
                                            key={item.id}
                                            ingredient={item}
                                            index={index}
                                        />
                                    )
                                )
                            )}
                        </div>

                        <div className='pl-4 pr-4'>
                            <div className={`${styles.elementContainer}`}>
                                <div className={styles.ingredient}>
                                    {bun && (
                                        <ConstructorElement
                                            type='bottom'
                                            isLocked={true}
                                            text={`${bun.name} (низ)`}
                                            price={bun.price}
                                            thumbnail={bun.image}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {!loading ? (
                        <div className={`${styles.orderSend} mt-10 pl-4 pr-4`}>
                            <span
                                className={`${styles.orderInfo} text text_type_digits-medium`}
                            >
                                {total}
                            </span>
                            <span className={`${styles.currencyIcon} mr-10`}>
                                <CurrencyIcon type='primary' />
                            </span>
                            <Button
                                htmlType='button'
                                type='primary'
                                size='large'
                                disabled={!ingredients.length || !bun}
                                onClick={handleCreateOrder}
                            >
                                Оформить заказ
                            </Button>
                        </div>
                    ) : (
                        <Loader size='large' />
                    )}

                    {visibleOrderDetail && orderFields.success && (
                        <OrderDetails
                            handleClose={handleCloseOrderDetail}
                            orderId={orderFields?.order?.number}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default BurgerConstructor;
