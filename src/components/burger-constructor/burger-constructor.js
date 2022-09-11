import { useState } from 'react';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import OrderDetails from './../order-details/order-details';

function BurgerConstructor({data}) {

    const [visibleOrderDetail, setVisibleOrderDetail] = useState(false);

    const handleCloseOrderDetail = () => {
        setVisibleOrderDetail(false);
    }

    const handleOpenOrderDetail = () => {
        setVisibleOrderDetail(true);
    }

	return (
		<div className='ml-5 mt-5'>
            {data.length ?
            <>
                <div className={styles.elementsWrapper}>
                    <div className='pl-4 pr-4'>
                        <div className={`${styles.elementContainer}`}>
                            <div className={styles.ingredient}>
                                <ConstructorElement
                                    type="top"
                                    isLocked={true}
                                    text={`${data[0].name} (верх)`}
                                    price={data[0].price}
                                    thumbnail={data[0].image}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.scrollable} custom-scroll pl-4 pr-4`}>
                        {data.map((item, index) => (
                            (index !== 0 && index !== 1) &&
                            (<div className={styles.elementContainer} key={index} >
                                <div className={styles.dragImg}>
                                    <DragIcon type="primary" />
                                </div>
                                <div className={styles.ingredient}>
                                    <ConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </div>
                            </div>)
                        ))}
                    </div>

                    <div className='pl-4 pr-4'>
                        <div className={`${styles.elementContainer}`}>
                            <div className={styles.ingredient}>
                                <ConstructorElement
                                    type="bottom"
                                    isLocked={true}
                                    text={`${data[1].name} (низ)`}
                                    price={data[1].price}
                                    thumbnail={data[1].image}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.orderSend} mt-10 pl-4 pr-4`}>
                    <span className={`${styles.orderInfo} text text_type_digits-medium`}>610</span>
                    <span className={`${styles.currencyIcon} mr-10`}><CurrencyIcon type="primary" /></span>
                    <Button type="primary" size="large" onClick={handleOpenOrderDetail} >
                        Оформить заказ
                    </Button>
                </div>

                <OrderDetails isOpen={visibleOrderDetail} handleClose={handleCloseOrderDetail} />
            </>
            :
                <p className='text text_type_main-default'>Загрузка...</p>
            }

		</div>
	);
}

export default BurgerConstructor;
