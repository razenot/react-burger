import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from '../ingredients-group/ingredients-group';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from './../../services/actions/ingredients';
import { Loader } from './../../ui/loader/loader';

function BurgerIngredients() {
    const dispatch = useDispatch();

    const { ingredients, loading } = useSelector(
        (state) => state.ingredientsReducer
    );

    // TODO: обработать ошибку

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    const [current, setCurrent] = useState('bun');

    const bunsRef = useRef();
    const saucesRef = useRef();
    const mainsRef = useRef();

    const buns = useMemo(
        () => ingredients.filter((item) => item.type === 'bun'),
        [ingredients]
    );

    const sauces = useMemo(
        () => ingredients.filter((item) => item.type === 'sauce'),
        [ingredients]
    );

    const mains = useMemo(
        () => ingredients.filter((item) => item.type === 'main'),
        [ingredients]
    );

    return (
        <div className='mr-5'>
            <div className={styles.tabs}>
                <Tab
                    value='bun'
                    active={current === 'bun'}
                    onClick={(val) => setCurrent(val)}
                >
                    Булки
                </Tab>
                <Tab
                    value='sauce'
                    active={current === 'sauce'}
                    onClick={(val) => setCurrent(val)}
                >
                    Соусы
                </Tab>
                <Tab
                    value='main'
                    active={current === 'main'}
                    onClick={(val) => setCurrent(val)}
                >
                    Начинки
                </Tab>
            </div>

            {/* {buns.length && sauces.length && mains.length ? ( */}
            {!loading ? (
                <ul className={`${styles.groupList} custom-scroll mt-10`}>
                    <li className={styles.ingredientsGroup} ref={bunsRef}>
                        <IngredientsGroup
                            groupName='Булки'
                            ingredients={buns}
                        />
                    </li>
                    <li className={styles.ingredientsGroup} ref={saucesRef}>
                        <IngredientsGroup
                            groupName='Соусы'
                            ingredients={sauces}
                        />
                    </li>
                    <li className={styles.ingredientsGroup} ref={mainsRef}>
                        <IngredientsGroup
                            groupName='Начинка'
                            ingredients={mains}
                        />
                    </li>
                </ul>
            ) : (
                <p className='mt-10 text text_type_main-default'>
                    <Loader size='large' />
                </p>
            )}
        </div>
    );
}

const ingredientData = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
});

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientData.isRequired),
};

export default BurgerIngredients;
