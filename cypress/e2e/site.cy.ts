import { BURGER_API_URL } from './../../src/services/utils/burger-api';

const BUN_INGREDIENT = '[data-test-id=buns_group] [data-test-id=any_ingredient]';
const SOUSE_INGREDIENT = '[data-test-id=sauces_group] [data-test-id=any_ingredient]';
const MAINS_INGREDIENT = '[data-test-id=mains_group] [data-test-id=any_ingredient]';
const MODAL = '[data-test-id=modal]';
const CLOSE_MODAL = '[data-test-id=close_modal]';
const CALORIES = '[data-test-id=ingredient_detail_calories]';
const PROTEINS = '[data-test-id=ingredient_detail_proteins]';
const FAT = '[data-test-id=ingredient_detail_fat]';
const DETAIL_NAME = '[data-test-id=ingredient_detail_name]';
const CARBOHYDRATES = '[data-test-id=ingredient_detail_carbohydrates]';
const INGREDIENT_NAME = '[data-test-id=ingredient_name]';

describe('burgers spec', () => {
    before(() => {
        cy.visit('/');
        cy.contains('Соберите бургер');
    });

    beforeEach(() => {
        cy.intercept('GET', `${BURGER_API_URL}/ingredients`, {
            fixture: 'ingredients.json',
        });
    });

    it('should open ingredient modal', () => {
        cy.visit('/');
        //buns
        cy.get(BUN_INGREDIENT).first().click();
        cy.get(MODAL).contains('Детали ингредиента').should('exist');
        cy.get(MODAL)
            .find('img')
            .should('have.attr', 'src', 'https://code.s3.yandex.net/react/code/bun-02-large.png')
            .should('exist');
        cy.get(MODAL).find(DETAIL_NAME).contains('Краторная булка N-200i').should('exist');
        cy.get(MODAL).find(CALORIES).contains('420').should('exist');
        cy.get(MODAL).find(PROTEINS).contains('80').should('exist');
        cy.get(MODAL).find(FAT).contains('24').should('exist');
        cy.get(MODAL).find(CARBOHYDRATES).contains('53').should('exist');
        cy.get(CLOSE_MODAL).click();
        cy.contains('Детали ингредиента').should('not.exist');

        //sauces
        cy.get(SOUSE_INGREDIENT).first().click();
        cy.get(MODAL).contains('Детали ингредиента').should('exist');
        cy.get(MODAL)
            .find('img')
            .should('have.attr', 'src', 'https://code.s3.yandex.net/react/code/sauce-02-large.png');
        cy.get(MODAL).find(DETAIL_NAME).contains('Соус Spicy-X').should('exist');
        cy.get(MODAL).find(CALORIES).contains('30').should('exist');
        cy.get(MODAL).find(PROTEINS).contains('30').should('exist');
        cy.get(MODAL).find(FAT).contains('20').should('exist');
        cy.get(MODAL).find(CARBOHYDRATES).contains('40').should('exist');
        cy.get(CLOSE_MODAL).click();
        cy.contains('Детали ингредиента').should('not.exist');

        //mains
        cy.get(MAINS_INGREDIENT).first().click();
        cy.get(MODAL).contains('Детали ингредиента').should('exist');
        cy.get(MODAL)
            .find('img')
            .should('have.attr', 'src', 'https://code.s3.yandex.net/react/code/meat-03-large.png')
            .should('exist');
        cy.get(MODAL)
            .find(DETAIL_NAME)
            .contains('Филе Люминесцентного тетраодонтимформа')
            .should('exist');
        cy.get(MODAL).find(CALORIES).contains('643').should('exist');
        cy.get(MODAL).find(PROTEINS).contains('44').should('exist');
        cy.get(MODAL).find(FAT).contains('26').should('exist');
        cy.get(MODAL).find(CARBOHYDRATES).contains('85').should('exist');
        cy.get(CLOSE_MODAL).click();
        cy.contains('Детали ингредиента').should('not.exist');
    });

    it('should add ingredients to constructor using dnd', () => {
        cy.visit('/');

        cy.get(BUN_INGREDIENT).first().as('bun');
        cy.get(BUN_INGREDIENT).last().as('bun2');
        cy.get(SOUSE_INGREDIENT).first().as('souse');
        cy.get(MAINS_INGREDIENT).first().as('main');
        cy.get('[data-test-id=constructor_buns]').as('constructorBuns');
        cy.get('[data-test-id=constructor_ingredients]').as('constructorIngredients');

        cy.get('@bun')
            .find(INGREDIENT_NAME)
            .then(($nameBun) => {
                cy.get('@bun').trigger('dragstart');
                cy.get('@constructorBuns').trigger('drop');
                cy.get('@constructorBuns').contains($nameBun.text()).should('exist');
            });

        cy.get('@souse')
            .find(INGREDIENT_NAME)
            .then(($nameSouse) => {
                cy.get('@souse').trigger('dragstart');
                cy.get('@constructorIngredients').trigger('drop');
                cy.get('@constructorIngredients').contains($nameSouse.text()).should('exist');
            });

        cy.get('@main')
            .find(INGREDIENT_NAME)
            .then(($nameMain) => {
                cy.get('@main').trigger('dragstart');
                cy.get('@constructorIngredients').trigger('drop');
                cy.get('@constructorIngredients').contains($nameMain.text()).should('exist');
            });

        cy.get('@bun2')
            .find(INGREDIENT_NAME)
            .then(($nameBun2) => {
                cy.get('@bun2').trigger('dragstart');
                cy.get('@constructorBuns').trigger('drop');
                cy.get('@constructorBuns').contains($nameBun2.text()).should('exist');
            });

        // not exist
        cy.get('@bun')
            .find(INGREDIENT_NAME)
            .then(($nameBun) => {
                cy.get('@bun').trigger('dragstart');
                cy.get('@constructorIngredients').trigger('drop');
                cy.get('@constructorIngredients').contains($nameBun.text()).should('not.exist');
            });

        cy.get('@main')
            .find(INGREDIENT_NAME)
            .then(($nameMain) => {
                cy.get('@main').trigger('dragstart');
                cy.get('@constructorBuns').trigger('drop');
                cy.get('@constructorBuns').contains($nameMain.text()).should('not.exist');
            });
    });

    it('should process order with auth', () => {
        cy.visit('/');

        cy.intercept('POST', `${BURGER_API_URL}/orders`, {
            fixture: 'order.json',
        }).as('postOrder');

        cy.intercept('POST', `${BURGER_API_URL}/auth/login`, {
            fixture: 'user.json',
        });

        // drop ingredients in constructor
        cy.get(BUN_INGREDIENT).first().as('bun');
        cy.get(SOUSE_INGREDIENT).first().as('souse');
        cy.get(MAINS_INGREDIENT).first().as('main');
        cy.get('[data-test-id=constructor_buns]').as('constructorBuns');
        cy.get('[data-test-id=constructor_ingredients]').as('constructorIngredients');

        cy.get('@bun').trigger('dragstart');
        cy.get('@constructorBuns').trigger('drop');
        cy.get('@souse').trigger('dragstart');
        cy.get('@constructorIngredients').trigger('drop');
        cy.get('@main').trigger('dragstart');
        cy.get('@constructorIngredients').trigger('drop');

        // order
        cy.get('[data-test-id=order_submit]').click();

        // oops, you should be authorised
        cy.get('[data-test-id=email_input] input')
            .type('test@mail.com')
            .should('have.value', 'test@mail.com');
        cy.get('[data-test-id=password_input] input')
            .type('0123456789')
            .should('have.value', '0123456789');

        cy.get('[data-test-id=auth_submit] button').click();

        localStorage.setItem('accessToken', JSON.stringify('test-accessToken'));
        localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));

        // repeat and response
        cy.get('[data-test-id=order_submit]').click();
        cy.wait('@postOrder');

        cy.get(MODAL).contains('123').should('exist');
        cy.get(CLOSE_MODAL).click();
        cy.contains('идентификатор заказа').should('not.exist');
    });
});
