import Modal from '../modal/modal';
import { FC } from 'react';
import { TOrderDetails } from '../../services/utils/types';
import styles from './order-details.module.css';
import doneImg from './../../images/done.svg';

const OrderDetails: FC<TOrderDetails> = ({ handleClose, orderId }) => {
    return (
        <div className={styles.overflow}>
            <Modal handleClose={handleClose}>
                <div className={`${styles.body} mt-20 mb-15 ml-15 mr-15`}>
                    <p className={`${styles.orderId} text text_type_digits-large`}>{orderId}</p>
                    <p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
                    <p className='mt-15'>
                        <img src={doneImg} alt='логотип.' />
                    </p>
                    <p className='text text_type_main-default mt-15'>Ваш заказ начали готовить</p>
                    <p className='text text_type_main-default text_color_inactive mt-2'>
                        Дождитесь готовности на орбитальной станции
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default OrderDetails;
