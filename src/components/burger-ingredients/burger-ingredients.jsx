import { useState, useEffect, useRef, useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from '../ingredients-group/ingredients-group';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from './../../services/actions/ingredients';
import { Loader } from './../../ui/loader/loader';
import { useInView } from 'react-intersection-observer';

function BurgerIngredients() {
    const dispatch = useDispatch();

    const { ingredients, loading, error } = useSelector(
        (state) => state.ingredientsReducer
    );

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    useEffect(() => {
        if (error) alert(error);
    }, [error]);

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

    const [current, setCurrent] = useState('bun');

    const bunsContainerRef = useRef();
    const saucesContainerRef = useRef();
    const mainsContainerRef = useRef();

    const [bunsRef, bunsView] = useInView({
        threshold: 0,
    });

    const [saucesRef, saucesView] = useInView({
        threshold: 0,
    });

    const [mainsRef, mainsView] = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (bunsView) {
            setCurrent('bun');
        } else if (saucesView) {
            setCurrent('sauce');
        } else if (mainsView) {
            setCurrent('main');
        }
    }, [bunsView, saucesView, mainsView]);

    return (
        <div className='mr-5'>
            <div className={styles.tabs}>
                <Tab
                    active={current === 'bun'}
                    onClick={() =>
                        bunsContainerRef.current.scrollIntoView({
                            behavior: 'smooth',
                        })
                    }
                >
                    Булки
                </Tab>
                <Tab
                    active={current === 'sauce'}
                    onClick={() =>
                        saucesContainerRef.current.scrollIntoView({
                            behavior: 'smooth',
                        })
                    }
                >
                    Соусы
                </Tab>
                <Tab
                    active={current === 'main'}
                    onClick={() =>
                        mainsContainerRef.current.scrollIntoView({
                            behavior: 'smooth',
                        })
                    }
                >
                    Начинки
                </Tab>
            </div>
            {!loading ? (
                error ? (
                    <p className='mt-10 text text_type_main-default'>
                        Ошибка загрузки данных.
                    </p>
                ) : (
                    <ul className={`${styles.groupList} custom-scroll mt-10`}>
                        <li
                            className={styles.ingredientsGroup}
                            ref={bunsContainerRef}
                        >
                            <IngredientsGroup
                                groupType='buns'
                                groupName='Булки'
                                ingredients={buns}
                                ref={bunsRef}
                            />
                        </li>
                        <li
                            className={styles.ingredientsGroup}
                            ref={saucesContainerRef}
                        >
                            <IngredientsGroup
                                groupType='sauces'
                                groupName='Соусы'
                                ingredients={sauces}
                                ref={saucesRef}
                            />
                        </li>
                        <li
                            className={styles.ingredientsGroup}
                            ref={mainsContainerRef}
                        >
                            <IngredientsGroup
                                groupType='mains'
                                groupName='Начинка'
                                ingredients={mains}
                                ref={mainsRef}
                            />
                        </li>
                    </ul>
                )
            ) : (
                <Loader size='large' />
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
