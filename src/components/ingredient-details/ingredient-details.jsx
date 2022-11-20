import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Modal from '../modal/modal';
import styles from './ingredient-details.module.css';

function IngredientDetails({ handleClose }) {
    const data = useSelector(
        (state) => state.ingredientDetailReducer.ingredientData
    );

    return (
        <div className={styles.overflow}>
            <Modal title='Детали ингредиента' handleClose={handleClose}>
                <div className={`${styles.body} pl-15 pr-15`}>
                    <div className='pl-4 pr-4'>
                        <img src={data.image_large} alt={data.name} />
                    </div>
                    <p className='text text_type_main-medium mt-4'>
                        {data.name}
                    </p>
                    <ul className={`${styles.nutrition} mt-8`}>
                        <li className='pl-5'>
                            <span className='text text_type_main-default text_color_inactive'>
                                Калории,ккал
                            </span>
                            <span className='text text_type_digits-medium text_color_inactive mt-2'>
                                {data.calories}
                            </span>
                        </li>
                        <li className='pl-5'>
                            <span className='text text_type_main-default text_color_inactive'>
                                Белки, г
                            </span>
                            <span className='text text_type_digits-medium text_color_inactive mt-2'>
                                {data.proteins}
                            </span>
                        </li>
                        <li className='pl-5'>
                            <span className='text text_type_main-default text_color_inactive'>
                                Жиры, г
                            </span>
                            <span className='text text_type_digits-medium text_color_inactive mt-2'>
                                {data.fat}
                            </span>
                        </li>
                        <li className='pl-5'>
                            <span className='text text_type_main-default text_color_inactive'>
                                Углеводы, г
                            </span>
                            <span className='text text_type_digits-medium text_color_inactive mt-2'>
                                {data.carbohydrates}
                            </span>
                        </li>
                    </ul>
                </div>
            </Modal>
        </div>
    );
}

IngredientDetails.propTypes = {
    handleClose: PropTypes.func,
};

export default IngredientDetails;
