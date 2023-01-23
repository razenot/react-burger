import { TIngredient, TOrderFormat } from './types';

export const costBurger = (
    ingredientId: ReadonlyArray<string>,
    ingredients: ReadonlyArray<TIngredient>
) => {
    return ingredientId.reduce((acc: number, id: string) => {
        const itemDetail = ingredients.find((item) => item._id === id);
        return itemDetail ? itemDetail.price + acc : acc;
    }, 0);
};

export const syncIngredientsFormat = (
    ingredientId: ReadonlyArray<string>,
    ingredients: ReadonlyArray<TIngredient>
): { orderArray: Array<TOrderFormat>; count: { [id: string]: number } } => {
    const orderArrayTemp: Array<TOrderFormat> = [];
    const countTemp: { [id: string]: number } = {};
    ingredientId &&
        ingredientId.forEach((id) => {
            if (orderArrayTemp.length === 0 || !orderArrayTemp.find((item) => item.id === id)) {
                let detailIngredients: TIngredient | undefined = ingredients.find(
                    (ingredient) => ingredient._id === id
                );
                if (detailIngredients) {
                    let detail: TOrderFormat = {
                        id: detailIngredients._id,
                        image_mobile: detailIngredients.image_mobile,
                        name: detailIngredients.name,
                        price: detailIngredients.price,
                    };
                    countTemp[id] = 1;
                    orderArrayTemp.push(detail);
                }
            } else {
                countTemp[id] = countTemp[id] + 1;
            }
        });
    return { orderArray: orderArrayTemp, count: countTemp };
};

export const statusMap = (status: string | undefined) => {
    switch (status) {
        case 'done':
            return {
                rus: 'Выполнен',
                color: '#00CCCC',
            };
        case 'pending':
            return {
                rus: 'Готовится',
                color: '#F2F2F3',
            };
        case 'cancelled':
            return {
                rus: 'Отменен',
                color: '#E52B1A',
            };
    }
};
