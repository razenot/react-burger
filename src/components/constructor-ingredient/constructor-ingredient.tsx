import { FC, useRef } from 'react';
import { useDispatch } from '../../services/hooks/redux-hook';
import { useDrop, useDrag, DropTargetMonitor } from 'react-dnd';
import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './../burger-constructor/burger-constructor.module.css';
import { TConstructorIngredient } from '../../services/utils/types';
import { Identifier, XYCoord } from 'dnd-core';
import {
    constructorRebuildCreator,
    constructorRemoveCreator,
} from '../../services/redux/actions/creator/constructor';

const ConstructorIngredient: FC<TConstructorIngredient> = ({
    ingredient,
    index,
}) => {
    const dispatch = useDispatch();

    const removeIngredients = () => {
        dispatch(constructorRemoveCreator(ingredient.id));
    };

    const ref = useRef<HTMLDivElement>(null!);

    const [{ itemDragging }, drag] = useDrag({
        type: 'sort',
        item: () => {
            return { ingredient, index };
        },
        collect: (monitor) => ({
            itemDragging: monitor.isDragging(),
        }),
    });

    const [{ handlerItemId }, drop] = useDrop<
        TConstructorIngredient,
        void,
        { handlerItemId: Identifier | null }
    >({
        accept: 'sort',
        collect(monitor) {
            return {
                handlerItemId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor: DropTargetMonitor) {
            if (item.index === index) return;

            const bounding = ref.current?.getBoundingClientRect();
            const centerDrag = (bounding.bottom - bounding.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const positionDrag = (clientOffset as XYCoord).y - bounding.top;

            if (
                (item.index < index && positionDrag < centerDrag) ||
                (item.index > index && positionDrag > centerDrag)
            )
                return;

            dispatch(constructorRebuildCreator(item.index, index));
            item.index = index;
        },
    });

    const opacity: number = itemDragging ? 0.3 : 1;
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

export default ConstructorIngredient;
