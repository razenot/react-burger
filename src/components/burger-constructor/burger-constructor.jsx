import { useEffect, useState } from 'react';
import {
    ConstructorElement,
    DragIcon,
    Button,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
    CONSTRUCTOR_REMOVE,
    CONSTRUCTOR_REORDER,
    CONSTRUCTOR_RESET,
} from './../../services/actions/constructor';
import { constructorAdd } from './../../services/actions/constructor';

function BurgerConstructor() {
    const [totla, setTotal] = useState(0);

    const dispatch = useDispatch();

    const { ingredients, bun } = useSelector(
        (state) => state.constructorReducer
    );

    useEffect(() => {
        let price = ingredients.length
            ? ingredients.reduce((a, b) => a + b.price, 0)
            : 0;
        price += bun ? bun.price * 2 : 0;
        setTotal(price);
    }, [ingredients, bun]);

    const [visibleOrderDetail, setVisibleOrderDetail] = useState(false);

    const handleCloseOrderDetail = () => {
        setVisibleOrderDetail(false);
    };

    const handleOpenOrderDetail = () => {
        setVisibleOrderDetail(true);
    };

    const [, dropBunTarget] = useDrop({
        accept: 'bun',
        drop(item) {
            moveIngredients(item);
        },
    });

    const [, dropIngredientTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            moveIngredients(item);
        },
    });

    const moveIngredients = (ingredient) => {
        dispatch(constructorAdd(ingredient));
    };

    const removeIngredints = (id) => {
        dispatch({
            type: CONSTRUCTOR_REMOVE,
            payload: id,
        });
    };

    return (
        <div className={`${styles.burgerConstructor} ml-5 mt-5`}>
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
                            ingredients.map((item) => (
                                <div
                                    className={styles.elementContainer}
                                    key={item.id}
                                >
                                    <div className={styles.dragImg}>
                                        <DragIcon type='primary' />
                                    </div>
                                    <div className={styles.ingredient}>
                                        <ConstructorElement
                                            text={item.name}
                                            price={item.price}
                                            thumbnail={item.image}
                                            handleClose={() =>
                                                removeIngredints(item.id)
                                            }
                                        />
                                    </div>
                                </div>
                            ))
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

                <div className={`${styles.orderSend} mt-10 pl-4 pr-4`}>
                    <span
                        className={`${styles.orderInfo} text text_type_digits-medium`}
                    >
                        {totla}
                    </span>
                    <span className={`${styles.currencyIcon} mr-10`}>
                        <CurrencyIcon type='primary' />
                    </span>
                    <Button
                        htmlType='button'
                        type='primary'
                        size='large'
                        onClick={handleOpenOrderDetail}
                    >
                        Оформить заказ
                    </Button>
                </div>

                {visibleOrderDetail && (
                    <OrderDetails handleClose={handleCloseOrderDetail} />
                )}
            </>
        </div>
    );
}

// const ingredientData = PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//     proteins: PropTypes.number,
//     fat: PropTypes.number,
//     carbohydrates: PropTypes.number,
//     calories: PropTypes.number,
//     price: PropTypes.number,
//     image: PropTypes.string.isRequired,
//     image_mobile: PropTypes.string.isRequired,
//     image_large: PropTypes.string.isRequired,
// });

// BurgerConstructor.propTypes = {
//     data: PropTypes.arrayOf(ingredientData.isRequired),
// };

export default BurgerConstructor;
