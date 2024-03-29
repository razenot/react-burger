import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { NotFound404 } from '../../pages';
import { useSelector } from '../../services/hooks/redux-hook';
import { TIngredient } from '../../services/utils/types';
import styles from './ingredient-details.module.css';

interface IIngredientDetailsParams {
    id: string;
}

const IngredientDetails: FC = () => {
    const { ingredients } = useSelector((state) => state.ingredientsReducer);
    const { id } = useParams<IIngredientDetailsParams>();

    let data: TIngredient | undefined = useMemo(() => {
        return ingredients.find((item: TIngredient) => item._id === id);
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
                <p
                    className='text text_type_main-medium mt-4'
                    data-test-id='ingredient_detail_name'
                >
                    {data.name}
                </p>
                <ul className={`${styles.nutrition} mt-8`}>
                    <li className='pl-5'>
                        <span className='text text_type_main-default text_color_inactive'>
                            Калории,ккал
                        </span>
                        <span
                            className='text text_type_digits-medium text_color_inactive mt-2'
                            data-test-id='ingredient_detail_calories'
                        >
                            {data.calories}
                        </span>
                    </li>
                    <li className='pl-5'>
                        <span className='text text_type_main-default text_color_inactive'>
                            Белки, г
                        </span>
                        <span
                            className='text text_type_digits-medium text_color_inactive mt-2'
                            data-test-id='ingredient_detail_proteins'
                        >
                            {data.proteins}
                        </span>
                    </li>
                    <li className='pl-5'>
                        <span className='text text_type_main-default text_color_inactive'>
                            Жиры, г
                        </span>
                        <span
                            className='text text_type_digits-medium text_color_inactive mt-2'
                            data-test-id='ingredient_detail_fat'
                        >
                            {data.fat}
                        </span>
                    </li>
                    <li className='pl-5'>
                        <span className='text text_type_main-default text_color_inactive'>
                            Углеводы, г
                        </span>
                        <span
                            className='text text_type_digits-medium text_color_inactive mt-2'
                            data-test-id='ingredient_detail_carbohydrates'
                        >
                            {data.carbohydrates}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default IngredientDetails;
