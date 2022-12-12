import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NotFound404 } from '../../pages';
import { getIngredients } from '../../services/redux/ingredients/action';
import styles from './ingredient-details.module.css';

function IngredientDetails() {
    const { ingredients } = useSelector((state) => state.ingredientsReducer);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!ingredients.length) {
            dispatch(getIngredients());
        }
    }, [ingredients.length, dispatch]);

    let data = useMemo(() => {
        return ingredients.find((item) => item._id === id);
    }, [ingredients, id]);

    if (!ingredients.length) {
        return null;
    }

    if (!data) {
        return <NotFound404 />;
    }

    return (
        <div className={styles.overflow}>
            <div className={`${styles.body} pl-15 pr-15`}>
                <div className='pl-4 pr-4'>
                    <img src={data.image_large} alt={data.name} />
                </div>
                <p className='text text_type_main-medium mt-4'>{data.name}</p>
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
        </div>
    );
}

export default IngredientDetails;
