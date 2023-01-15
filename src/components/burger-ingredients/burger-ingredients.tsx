import { useState, useEffect, useRef, useMemo, FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useInView } from 'react-intersection-observer';
import IngredientsGroup from '../ingredients-group/ingredients-group';
import { Loader } from '../../ui/loader/loader';
import styles from './burger-ingredients.module.css';
import { TIngredient } from '../../services/utils/types';
import { useSelector } from '../../services/hooks/redux-hook';

const BurgerIngredients: FC = () => {
    const { ingredients, loading, error } = useSelector(
        (state) => state.ingredientsReducer
    );

    useEffect(() => {
        if (error) alert(error);
    }, [error]);

    const buns = useMemo(
        () => ingredients.filter((item: TIngredient) => item.type === 'bun'),
        [ingredients]
    );

    const sauces = useMemo(
        () => ingredients.filter((item: TIngredient) => item.type === 'sauce'),
        [ingredients]
    );

    const mains = useMemo(
        () => ingredients.filter((item: TIngredient) => item.type === 'main'),
        [ingredients]
    );

    const [current, setCurrent] = useState<string>('bun');

    const bunsContainerRef = useRef<HTMLLIElement>(null!);
    const saucesContainerRef = useRef<HTMLLIElement>(null!);
    const mainsContainerRef = useRef<HTMLLIElement>(null!);

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
                    value='bun'
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
                    value='sauce'
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
                    value='main'
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
};

export default BurgerIngredients;
