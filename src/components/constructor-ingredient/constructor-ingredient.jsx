import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { propIngredientData } from './../../services/prop-types-pattern';
import {
    CONSTRUCTOR_REMOVE,
    CONSTRUCTOR_REBUILD,
} from '../../services/redux/constructor/action';
import styles from './../burger-constructor/burger-constructor.module.css';

const ConstructorIngredient = ({ ingredient, index }) => {
    const dispatch = useDispatch();

    const removeIngredients = () => {
        dispatch({
            type: CONSTRUCTOR_REMOVE,
            payload: ingredient.id,
        });
    };

    const ref = useRef(null);

    const [{ itemDragging }, drag] = useDrag({
        type: 'sort',
        item: () => {
            return { ingredient, index };
        },
        collect: (monitor) => ({
            itemDragging: monitor.isDragging(),
        }),
    });

    const [{ handlerItemId }, drop] = useDrop({
        accept: 'sort',
        collect(monitor) {
            return {
                handlerItemId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (item.index === index) return;

            const bounding = ref.current?.getBoundingClientRect();
            const centerDrag = (bounding.bottom - bounding.top) / 2;
            const positionDrag = monitor.getClientOffset().y - bounding.top;

            if (
                (item.index < index && positionDrag < centerDrag) ||
                (item.index > index && positionDrag > centerDrag)
            )
                return;

            dispatch({
                type: CONSTRUCTOR_REBUILD,
                payload: {
                    after: item.index,
                    before: index,
                },
            });
            item.index = index;
        },
    });

    const opacity = itemDragging ? 0.3 : 1;
    drag(drop(ref));

    return (
        <div
            className={styles.elementContainer}
            data-handler-id={handlerItemId}
            ref={ref}
            style={{ opacity }}
        >
            <div className={styles.dragImg}>
                <DragIcon type='primary' />
            </div>
            <div className={styles.ingredient}>
                <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={removeIngredients}
                />
            </div>
        </div>
    );
};

ConstructorIngredient.propTypes = {
    ingredient: propIngredientData.isRequired,
    index: PropTypes.number,
};

export default ConstructorIngredient;
